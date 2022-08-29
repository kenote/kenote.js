import { resolve } from 'path'
import createError from 'http-errors'
import jsYaml from 'js-yaml'
import ruleJudgment from 'rule-judgment'
import { filterData } from 'parse-string'
import { isJson, isYaml, loadConfig } from '@kenote/config'
import type { TcpSocketConnectOpts } from 'net'
import type { TCPSocket } from '@kenote/protobuf'
import { APIProxy, NodeProxy } from '../types'
import { compact, concat, merge, uniq, isPlainObject, isString, isError, isBuffer } from 'lodash'
import { parsePlainObject, runService, getHeader, getServiceModules } from './utils'
import { parseProps } from './api-proxy'
import { shellAsCurl } from './http'
import { socketRequest } from './socket'

/**
 * 获取入口信息
 * @param options 
 * @returns 
 */
export function getNodeEntrance (options: NodeProxy.EntranceOptions) {
  return async (ctx: NodeProxy.Request, pathname: string) => {
    let { channel, pathLabel, sandbox } = options
    if (!ctx?.channel || !ctx?.pathLabel) {
      throw createError(500, '缺少频道和路径', { code: 1000 })
    }
    let channelPath = resolve(process.cwd(), pathname, channel)
    let allEntrance = loadConfig<NodeProxy.Entrance[]>([ pathname, channel, 'wss'].join('/'), { type: 'array' })
    let entrance = allEntrance?.find( v => v.name === pathLabel )
    if (!entrance) { 
      throw createError(500, '当前访问的接口不存在', { code: 1000 })
    }
    let setting = loadConfig<APIProxy.ChannelSetting>([ pathname, channel, 'setting' ].join('/'), { mode: 'merge' })
    let serviceModules = await getServiceModules({
      cwd: resolve(channelPath, 'js'),
      sandbox,
      alias: setting?.jsAlias
    })
    // 处理IP白名单
    let whitelist = uniq(compact(concat(setting?.whitelist, entrance?.whitelist)))
    if (whitelist.length > 0 && !whitelist.find( v => new RegExp(v).test(ctx.clientIP!) )) {
      throw createError(500, '没有访问该页面的权限 [whitelist]', { code: 1000 })
    }
    // 鉴权用户
    if (entrance.filterAuth) {
      let isAuth = ruleJudgment(entrance.filterAuth)(ctx.auth)
      if (!isAuth) {
        throw createError(500, '没有访问该页面的权限 [Unauthorized]', { code: 1000 })
      }
    }
    let body = ctx?.body ?? {}
    let payload = entrance.payload ? filterData(entrance.payload, serviceModules)(body) : body
    payload = parseProps(entrance.props)(payload)
    serviceModules.payload = payload
    return { serviceModules, payload, entrance, setting }
  }
}

/**
 * 获取代理返回数据
 * @param ctx 
 * @returns 
 */
export function getNodeResponse (entrance: NodeProxy.Entrance | undefined, payload: any) {
  return async (options: NodeProxy.ProxyOptions) => {
    let { serviceModules, logger, setting } = options
    let result: any = null
    let type: string | undefined = 'application/octet-stream'
    if (entrance?.service) {
      let { name, args } = entrance.service
      result = await runService(name, args)(serviceModules)
    }
    else if (entrance?.httpProxy) {
      let httpProxy = entrance.httpProxy
      if (httpProxy.method.toUpperCase() === 'GET') {
        httpProxy.params = merge(httpProxy.params, payload)
      }
      else {
        httpProxy.body = merge(httpProxy.body, payload)
      }
      let ret = await shellAsCurl(httpProxy)
      let [ , code ] = ret.status?.split(/\s+/) ?? []
      if (code != '200') {
        throw createError(500, ['HttpProxy:', ret.status?.replace('404 OK', '404 Not Found')! ].join(''), { code: 1000 })
      }
      result = ret.body
      type = getHeader('content-type')(ret.headers ?? [])
    }
    else if (entrance?.socketProxy) {
      let { msgtype, requestType, serverTag } = entrance.socketProxy
      let tag: string | undefined
      let tcpSocket: TCPSocket.Configure = { port: 8080 }
      let server: Array<TcpSocketConnectOpts & { key: string }> = []
      if (isPlainObject(serverTag)) {
        tcpSocket = serverTag as TCPSocket.Configure
      }
      else if (isString(serverTag)) {
        tag = serverTag
      }
      if (setting) {
        tcpSocket = merge(tcpSocket, setting?.tcpSocket)
      }
      tcpSocket.logger = logger
      result = await socketRequest(msgtype, payload!, requestType)({ tcpSocket, server, tag })
    }
    result = parsePlainObject(result, entrance?.parse)(<Record<string, Function>>serviceModules)
    return [ type, result ]
  }
}

/**
 * 转换返回结果
 * @param path 
 * @param data 
 * @returns 
 */
export function toResponseResult (path: string, data: any, type?: string) {
  let result: NodeProxy.Response = {
    timestamp: Date.now(),
    path
  }
  if (isError(data)) {
    result.error = data.message
  }
  else if (isBuffer(data)) {
    result.data = isJson(data.toString()) || isYaml(data.toString()) ? jsYaml.load(data) : data.toString()
  }
  else {
    result.data = data
  }
  return JSON.stringify(result)
}
