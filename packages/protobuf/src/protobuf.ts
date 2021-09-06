import path from 'path'
import protobuf from 'protobufjs'
import fs from 'fs'
import zlib from 'zlib'
import struct from 'python-struct'
import { get, set, isBuffer, merge } from 'lodash'
import type { Protobuf as IProtoBuf } from '../types'
import createError from 'http-errors'
import { compile, Options } from 'json-schema-to-typescript'
import { JSONSchema4, JSONSchema4TypeName } from 'json-schema'
import inspect from 'object-inspect'

const zlibOptions = { windowBits: 15, memLevel: 8 }

/**
 * 压缩数据
 * @param buffer 
 * @returns 
 */
const compressData = (buffer: zlib.InputType, options: zlib.ZlibOptions = zlibOptions) => 
  zlib.gzipSync(buffer, options)

/**
 * 解压数据
 * @param buffer 
 * @returns 
 */
const decompressData = (buffer: zlib.InputType, options: zlib.ZlibOptions = zlibOptions) => 
  zlib.unzipSync(buffer, options)

export class Protobuf {

  private __Options: IProtoBuf.Configure
  private INamespaces: IProtoBuf.INamespace[]

  constructor (options: IProtoBuf.Configure) {
    this.__Options = options
    let files = fs.readdirSync(path.resolve(process.cwd(), this.__Options.path)).filter( v => /(\.proto)$/.test(v) )
    let INamespaces: IProtoBuf.INamespace[] = []
    for (let filename of files) {
      if (fs.statSync(path.resolve(process.cwd(), this.__Options.path, filename)).isDirectory()) continue
      INamespaces.push({ filename, ...this.toObject(filename) })
    }
    this.INamespaces = INamespaces
  }

  /**
   * 对发送数据进行编码
   * @param msgtype 
   * @param csMsg 
   * @param params 
   * @returns 
   */
  encode (msgtype: number, params: Record<string, any>, requestType?: string) {
    let { encode } = this.__Options
    let values: Record<string, any> = {}
    for (let [key, val] of Object.entries(encode.fields)) {
      set(values, key, val)
    }
    set(values, encode.msgtype, msgtype)
    set(values, encode.payload, params)
    let message = this.getMessageType(encode.type)
    let payload = this.getPayload(message, values, requestType ?? this.__Options.requestType)
    let data = message?.encode(message.create(payload)).finish()
    return makeData(data as zlib.InputType, merge(zlibOptions, encode.zlibOptions))
  }

  /**
   * 对返回数据进行解码
   * @param buffer 
   * @param responseType 
   * @returns 
   */
  decode (buffer: zlib.InputType, decodeOptions?: IProtoBuf.DecodeOptions) {
    let decode = merge(this.__Options.decode, decodeOptions)
    let ungzipBuffer = decompressData(buffer, merge(zlibOptions, decode.zlibOptions))
    let data = this.getMessageType(decode?.type).decode(ungzipBuffer)
    for (let [key, val] of Object.entries(data)) {
      if (isBuffer(val) && get(decode, ['fields', key])) {
        data[key] = this.getMessageType(get(decode, ['fields', key])).decode(val)
      }
    }
    return data
  }

  /**
   * 获取消息类型
   * @param name 
   * @returns 
   */
  getMessageType (name: string) {
    let [ message ] = name.split('.').reverse()
    let filename = this.getFilename(name, 'message') ?? this.__Options.socket
    let pb = this.loadSync(filename)
    let namespace = parseNamespace(pb.root.toJSON())
    return pb.root.lookupType(`${namespace.packageName}.${message}`)
  }

  /**
   * 获取枚举类型
   * @param name 
   * @returns 
   */
  getEnumType (name: string) {
    let [ enumName ] = name.split('.').reverse()
    let filename = this.getFilename(name, 'enum') ?? this.__Options.socket
    let pb = this.loadSync(filename)
    let namespace = parseNamespace(pb.root.toJSON())
    return pb.root.lookupEnum(`${namespace.packageName}.${enumName}`)
  }

  /**
   * 获取定制服务
   * @param name 
   * @returns 
   */
  getService (name: string) {
    let [ service ] = name.split('.').reverse()
    let filename = this.getFilename(name, 'service') ?? this.__Options.socket
    let pb = this.loadSync(filename)
    let namespace = parseNamespace(pb.root.toJSON())
    return pb.root.lookupService(`${namespace.packageName}.${service}`)
  }

  /**
   * 将 Protobuf 文件转换为命名对象
   * @param filename 
   * @returns 
   */
  toObject (filename?: string) {
    let pb = this.loadSync(filename ?? this.__Options.socket)
    return parseNamespace(pb.root.toJSON())
  }

  /**
   * 加载 Protobuf
   * @param filename 
   * @returns 
   */
  loadSync (filename: string) {
    if (!/(\.proto)$/.test(filename ?? '')) {
      throw createError(`Please select the correct .proto file.`)
    }
    let filePath = path.resolve(process.cwd(), this.__Options?.path, filename)
    if (!fs.existsSync(filePath)) {
      throw createError(`File ${filename} not found.`)
    }
    return protobuf.loadSync(filePath)
  }

  /**
   * 获取请求数据结构
   * @param message 
   * @param values 
   * @param requestType 
   * @returns 
   */
  private getPayload (message: protobuf.Type, values: Record<string, any>, requestType: string) {
    let payload: Record<string, any> = {}
    for (let item of message?.fieldsArray ?? []) {
      if (['int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'double', 'float'].includes(item.type) && item.required) {
        payload[item.name] = get(values, item.name, item.repeated ? [] : 0) 
      }
      else if (['bool'].includes(item.type) && item.required) {
        payload[item.name] = get(values, item.name, item.repeated ? [] : false)
      }
      else if (['string'].includes(item.type) && item.required) {
        payload[item.name] = get(values, item.name, item.repeated ? [] : '')
      }
      else if (['bytes'].includes(item.type)) {
        let message = this.getMessageType(requestType)
        payload[item.name] = message.encode(message.create({ ...get(values, item.name) })).finish()
      }
      else if (/^[A-Z]/.test(item.type)) {
        let message = this.getMessageType(item.type)
        payload[item.name] = message.create({ ...get(values, item.name) })
      }
    }
    return payload
  }

  /**
   * 获取文件名
   * @param name 
   * @param type 
   * @returns 
   */
  private getFilename (name: string, type: 'message' | 'enum' | 'service') {
    let types = {
      message: 'messages',
      enum: 'enums',
      service: 'services'
    }
    let typeName = types[type] ?? 'messages'
    let [ message, proto ] = name.split('.').reverse()
    let files = this.INamespaces.filter( isProto(proto) )
    let filename: string | undefined
    for (let item of files) {
      if (Object.keys(item[typeName]).includes(message)) {
        filename = item.filename
      }
    }
    return filename
  }

  /**
   * 生成 TS 类型文件
   */
  async generateTypes (name?: string) {
    let tsPath = path.resolve(process.cwd(), name ?? this.__Options.tsOptions?.output ?? this.__Options.path)
    let options: Partial<Options> = { bannerComment: '' }
    for (let protoFile of this.INamespaces) {
      let { messages, filename, packageName, enums, services } = protoFile
      let [ fileName ] = filename!.split('.')
      let [ proto ] = packageName.split('.').reverse()
      let dts: string[] = []
      for (let [title, item] of Object.entries(messages)) {
        let str = await compile(this.ITypeToSchema(title, item, proto), title, options)
        dts.push(str)
      }
      for (let [title, item] of Object.entries(enums)) {
        let str = inspect(item.values).replace(/\,/g, ',\n ').replace(/\:/g, ' =').replace(/\{/g, `export enum ${title} {\n `).replace(/\}/g, `\n}\n`)
        dts.push(str)
      }
      for (let [title, item] of Object.entries(services)) {
        let methods: string[] = []
        for (let [key, method] of Object.entries(item.methods)) {
          methods.push(`  ${key} (req: ${method.requestType}): ${method.responseType}`)
        }
        let str =  `export interface ${title} {\n${methods.join('\n')}\n}\n`
        dts.push(str)
      }
      fs.writeFileSync(path.resolve(tsPath, `${fileName}.d.ts`), dts.join('\n'))
    }
  }

  /**
   * 将 IType 转换为 Json Schema
   * @param title 
   * @param messageType 
   * @param root 
   * @returns 
   */
  private ITypeToSchema (title: string, messageType: protobuf.IType, root: string) {
    let schema: JSONSchema4 = {
      title,
      additionalProperties: false,
      required: []
    }
    for (let [key, item] of Object.entries(messageType.fields)) {
      let propertie: JSONSchema4 = toSchemaType(item.type, item.rule === 'repeated')
      if (propertie.type === 'object') {
        let [ name, proto ] = item.type.split('.').reverse()
        let messageName = `${proto ?? root}.${name}`
        let message = this.getMessageType(messageName).toJSON()
        propertie = this.ITypeToSchema('', message, proto ?? root)
      }
      else if (propertie.type === 'array' && get(propertie, ['items', 'type']) === 'object') {
        let [ name, proto ] = item.type.split('.').reverse()
        let messageName = `${proto ?? root}.${name}`
        let message = this.getMessageType(messageName).toJSON()
        propertie.items = this.ITypeToSchema('', message, proto ?? root)
      }
      set(schema, ['properties', key], propertie)
      if (item.rule === 'required') {
        (schema.required as string[]).push(key)
      }
    }
    return schema
  }
}

/**
 * 判断 package 名称
 * @param name 
 * @returns 
 */
function isProto (name: string) {
  return (v: IProtoBuf.INamespace) => {
    let [ proto ] = v.packageName.split('.').reverse()
    return proto === name
  }
}

/**
 * 解析 Protobuf 信息
 * @param namespace 
 * @param name 
 * @returns 
 */
function parseNamespace (namespace: protobuf.INamespace, name: string[] = []): IProtoBuf.INamespace {
  let messages: Record<string, protobuf.IType> = {}
  let enums: Record<string, protobuf.IEnum> = {}
  let services: Record<string, protobuf.IService> = {}
  for (let key in namespace) {
    if (!['nested', 'options'].includes((key))) {
      name.push(key)
    }
    if (!get(namespace, 'options')) {
      return parseNamespace(namespace[key], name)
    }
    else {
      let nested = get(namespace, 'nested')
      for (let k in nested) {
        if (get(nested, [k, 'fields'])) {
          messages[k] = nested[k] as protobuf.IType
        }
        else if (get(nested, [k, 'values'])) {
          enums[k] = nested[k] as protobuf.IEnum
        }
        else if (get(nested, [k, 'methods'])) {
          services[k] = nested[k] as protobuf.IService
        }
      }
    }
    break
  }
  return { packageName: name.join('.'), messages, enums, services }
}

/**
 * 转换 Schema 类型
 * @param name 
 * @param repeated 
 * @returns 
 */
function toSchemaType (name: string, repeated: boolean = false) {
  let typeName: JSONSchema4TypeName = 'object'
  if (['int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64'].includes(name)) {
    typeName = 'integer'
  }
  else if (['double', 'float'].includes(name)) {
    typeName = 'number'
  }
  else if (['bool'].includes(name)) {
    typeName = 'boolean'
  }
  else if (['string'].includes(name)) {
    typeName = 'string'
  }
  else if (['bytes'].includes(name)) {
    typeName = 'any'
  }
  if (repeated) {
    return { type: 'array', items: { type: typeName } } as JSONSchema4
  }
  return { type: typeName } as JSONSchema4
}

/**
 * 打包数据
 * @param buffer 
 * @returns 
 */
export function makeData (buffer: zlib.InputType, options?: zlib.ZlibOptions) {
  let zlibBuffer = compressData(buffer, options)
  let head = struct.pack('!i', zlibBuffer.length)
  return Buffer.concat([ head, zlibBuffer ])
}
