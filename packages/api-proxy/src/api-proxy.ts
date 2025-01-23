import type { APIProxy } from '../types'
import { loadConfig, isJson, isYaml } from '@kenote/config'
import ruleJudgment from 'rule-judgment'
import { Context } from '@kenote/core'
import { compact, concat, get, merge, omit, pick, uniq, isPlainObject, isString, isArray, set } from 'lodash'
import createError from 'http-errors'
import { filterData, validSign } from 'parse-string'
import { shellAsCurl } from './http'
import { socketRequest } from './socket'
import { TCPSocket } from '@kenote/protobuf'
import type { TcpSocketConnectOpts } from 'net'
import { parsePlainObject, runService, getHeader, getServiceModules } from './utils'
import jsYaml from 'js-yaml'
import path from 'path'

/**
 * 获取代理返回数据
 * @param entrance 
 * @param payload 
 * @returns 
 */
export function getProxyResponse (entrance: APIProxy.Entrance | undefined, payload: any) {
  return async (options: APIProxy.ProxyOptions) => {
    let { setting, serviceModules, logger, ctx } = options
    let result: any = null
    let type: string | undefined = 'application/octet-stream'
    if (entrance?.service) {
      let { name, args } = entrance.service
      ctx.payload = payload
      result = await runService(name, args)(serviceModules, ctx)
    }
    else if (entrance?.httpProxy) {
      let httpProxy = entrance.httpProxy
      if (httpProxy.method.toUpperCase() === 'GET') {
        httpProxy.params = merge(httpProxy.params, payload)
      }
      else {
        httpProxy.body = merge(httpProxy.body, payload)
      }
      if (payload.__TAG) {
        httpProxy.url = `${httpProxy.url}/${payload.__TAG}`
      }
      let ret = await shellAsCurl(httpProxy)
      let [ , code ] = ret.status?.split(/\s+/) ?? []
      if (code != '200') {
        throw createError(500, ['HttpProxy:', ret.status?.replace('404 OK', '404 Not Found')! ].join(''), { code: 1000 })
      }
      result = ret.body
      type = getHeader('content-type')(ret.headers ?? [])
      if (isJson(result.toString())) {
        result = JSON.stringify(JSON.parse(result.toString()), null, 2)
      }
      if (isYaml(result.toString()) && entrance.native === 'json') {
        // type = 'application/json; charset=utf-8'
        result = JSON.stringify(jsYaml.load(result.toString()), null, 2)
      }
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
        server = setting.server??[]
      }
      tcpSocket.logger = logger
      result = await socketRequest(msgtype, payload, requestType)({ tcpSocket, server, tag })
    }
    result = parsePlainObject(result, entrance?.parse)(get(serviceModules, 'service.customize'))
    if (entrance?.native) {
      if (isPlainObject(result)) {
        result = JSON.stringify(result, null, 2)
      }
      if (isString(result)) {
        result = Buffer.from( result )
      }
    }
    if (isString(result)) {
      result = jsYaml.load(result)
    }
    return [ type, result ]
  }
}

/**
 * 获取入口信息
 * @param options 
 * @returns 
 */
export function getEntrance<T> (options: APIProxy.EntranceOptions<T>) {
  return async (ctx: Context, pathname: string) => {
    let { channel, pathLabel, getUser, sandbox } = options
    let channelPath = path.resolve(process.cwd(), pathname, channel)
    let allEntrance = loadConfig<APIProxy.Entrance[]>([ pathname, channel, 'api'].join('/'), { type: 'array' })
    let { method } = ctx
    let body = method === 'GET' ? ctx.query : ctx.body
    let entrance = allEntrance?.find( v => v.router.find( ruleJudgment({ method, path: pathLabel })) )
    if (!entrance) return { notFound: true }
    let setting = loadConfig<APIProxy.ChannelSetting>([ pathname, channel, 'setting' ].join('/'), { mode: 'merge' })
    let serviceModules = await getServiceModules({
      cwd: path.resolve(channelPath, 'js'),
      sandbox,
      alias: setting?.jsAlias
    })
    // 处理IP白名单
    let whitelist = uniq(compact(concat(setting?.whitelist, entrance?.whitelist)))
    if (whitelist.length > 0 && !whitelist.find( v => new RegExp(v).test(clientIP(ctx)) )) {
      throw createError(500, '没有访问该页面的权限', { code: 1000 })
    }
    // 鉴权判断
    let { authenticationState, isUser } = await useAuthentication(entrance, getUser)
    let payload = entrance.payload ? filterData(entrance.payload, serviceModules)(body) : body
    let __TAG = get(ctx.params, 'tag')
    if (__TAG) {
      set(payload, '__TAG', __TAG)
    }
    if (authenticationState?.type === 'sign' && !authenticationState.sign?.debug) {
      let { sign } = authenticationState
      if (isArray(sign?.token)) {
        let tokenOpts = __TAG ? sign?.token.find( ruleJudgment({ tags: { $_in: __TAG } }) ) : get(sign?.token, 0)
        let valid = tokenOpts && validSign(sign?.md5!, sign?.field!)(merge(payload, { key: tokenOpts?.key }))
        if (!valid) {
          throw createError(500, 'MD5验签失败', { code: 1000 })
        }
        
      }
      else {
        let valid = validSign(sign?.md5!, sign?.field!)(merge(payload, { key: sign?.token }))
        if (!valid) {
          throw createError(500, 'MD5验签失败', { code: 1000 })
        }
      }
    }
    if (authenticationState?.type === 'jwt') {
      if (isUser === false) {
        throw createError(500, '没有访问该页面的权限', { code: 1000 })
      }
    }
    payload = omit(parseProps(entrance.props)(payload), authenticationState?.type === 'sign' 
      ? [ authenticationState?.sign?.field ?? 'sign' ] 
      : []
    )
    serviceModules.payload = payload
    if (entrance.httpProxy) {
      entrance.native = entrance.native ?? true
    }
    return { isUser, payload, entrance, setting, authenticationState, channelPath, serviceModules }
  }
}

/**
 * 使用鉴权判断
 * @param entrance 
 * @param options 
 * @returns 
 */
async function useAuthentication<T> (entrance: APIProxy.Entrance, getUser: () => Promise<T> | T) {
  let authenticationState: APIProxy.Authentication | null = null
  let isUser: true | false | 'Unauthorized' = false
  if (entrance.authentication) {
    for (let authentication of entrance.authentication) {
      authenticationState = authentication
      if (authentication.type === 'jwt') {
        let user = await getUser()
        if (user) {
          isUser = ruleJudgment({ ...authentication.jwt })(user)
          if (isUser) break
        }
        else {
          isUser = 'Unauthorized'
        }
      }
      if (authentication.type === 'sign') {
        entrance.payload?.push({
          key: authentication.sign?.field ?? 'sign',
          type: 'string',
          rules: authentication.sign?.debug ? undefined : [
            { required: true, message: '缺少验签', code: 1000 }
          ],
        })
      }
    }
  }
  return { authenticationState, isUser }
}

/**
 * 映射对象
 * @param props 
 */
export function parseProps (props?: Record<string, string>) {
  return (data: Record<string, any>, tag: string = 'payload') => {
    if (!props) return data
    let result = data
    let keys: string[] = []
    for (let [key, val] of Object.entries(props)) {
      let value = get({ [tag]: data }, val)
      if (value !== undefined) result[key] = value
      if (key !== val) keys.push(val)
    }
    return pick(result, Object.keys(props))
  }
}

function clientIP (ctx: Context) {
  return <string> get(ctx.headers, 'x-forwarded-for') 
    ?? get(ctx.headers, 'x-real-ip') 
    ?? ctx.connection.remoteAddress 
    ?? ctx.req.socket.remoteAddress 
    ?? ctx.ip
}