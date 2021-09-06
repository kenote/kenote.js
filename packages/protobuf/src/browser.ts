
import pako from 'pako'
import struct from 'python-struct'
import { get, set, merge } from 'lodash'
import type { Browser as IBrowser } from '..'

const zlibOptions = { windowBits: 15, memLevel: 8 }

/**
 * 压缩数据
 * @param buffer 
 * @returns 
 */
const compressData = (buffer: pako.Data, options: pako.DeflateFunctionOptions = zlibOptions) => 
  pako.gzip(buffer, options)

/**
 * 解压数据
 * @param buffer 
 * @returns 
 */
const decompressData = (buffer: Buffer | ArrayBuffer) => {
  if (buffer instanceof ArrayBuffer) {
    let inflator = new pako.Inflate()
    inflator.push(buffer, true)
    return inflator.result
  }
  else {
    return pako.ungzip(buffer)
  }
}

export class Browser<T> {

  private __Options: IBrowser.Configure<T>

  constructor (options: IBrowser.Configure<T>) {
    this.__Options = options
  }

  get socket () {
    return this.__Options.socket
  }

  encode (msgtype: number, params: Record<string, any>, requestType?: string) {
    let { encode } = this.__Options
    let values: Record<string, any> = {}
    for (let [key, val] of Object.entries(encode.fields)) {
      set(values, key, val)
    }
    set(values, encode.msgtype, msgtype)
    let payloadMessage = this.getMessageType(requestType ?? this.__Options.requestType)
    set(values, encode.payload, payloadMessage?.encode(payloadMessage?.create(params)).finish())
    let message = this.getMessageType(encode.type)
    let data = message?.encode(message?.create(values)).finish()
    return makeData(data, merge(zlibOptions, encode.zlibOptions))
  }

  decode (buffer: Buffer | ArrayBuffer, decodeOptions?: IBrowser.DecodeOptions) {
    let decode = merge(decodeOptions, this.__Options.decode)
    let ungzipBuffer = decompressData(buffer)
    let data = this.getMessageType(decode?.type).decode(ungzipBuffer)
    for (let [key, val] of Object.entries(data)) {
      if (val instanceof Uint8Array && get(decode, ['fields', key])) {
        data[key] = this.getMessageType(get(decode, ['fields', key])).decode(val)
      }
    }
    return data
  }

  getMessageType (name: string) {
    let message = get(this.__Options.socket, name)
    if ('create' in message === false) return
    if ('encode' in message === false) return 
    if ('decode' in message === false) return 
    return message
  }
}

/**
 * 打包数据
 * @param buffer 
 * @returns 
 */
function makeData (buffer: pako.Data, options?: pako.DeflateFunctionOptions) {
  let zlibBuffer = compressData(buffer, options)
  let head = struct.pack('!i', zlibBuffer.length)
  return Buffer.concat([ head, zlibBuffer ])
}