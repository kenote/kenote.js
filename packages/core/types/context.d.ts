import { Socket } from 'net'
import { IncomingMessage, ServerResponse, IncomingHttpHeaders } from 'http'
import { CommonEngineOptions } from '@kenote/common'

/**
 * Context 控制器上下文
 */
export declare interface Context {

  /**
   * 获取 Application
   */
  app: any

  /**
   * Node Request 对象
   */
  req: IncomingMessage

  /**
   * Node Response 对象
   */
  res: ServerResponse

  /**
   * Payload 作为上下文传递
   */
  payload: any

  /**
   * 获取 HTTP 请求方式
   */
  method: string

  /**
   * 获取 HTTP 协议
   */
  protocol: string

  /**
   * 获取路由路径
   */
  path: string

  /**
   * 获取URL路径
   */
  url: string

  /**
   * 获取原始URL路径
   */
  originalUrl: string

  /**
   * 获取路由入口
   */
  baseUrl: string

  /**
   * 获取主机名
   */
  hostname: string

  /**
   * 获取 IP
   */
  ip: string

  /**
   * 获取 IPS
   */
  ips: string[]

  /**
   * 获取请求头
   */
  headers: IncomingHttpHeaders

  /**
   * 获取 Params 参数
   */
  params: any

  /**
   * 获取 Query 参数
   */
  query: any

  /**
   * 获取 Post 参数
   */
  body: any

  /**
   * 获取 Cookies
   */
  cookies: any

  /**
   * 获取 statusCode
   */
  statusCode: number

  /**
   * 获取 connection
   */
  connection: Socket

  /**
   * 设置 HTTP 状态码
   */
  status (code: number): this

  /**
   * 发送信息
   * @param body any
   */
  send (body?: any): this

  /**
   * 返回一个JSON
   * @param body any
   */
  json (body?: any): this

  /**
   * 返回一个JSONP
   * @param body any
   */
  jsonp (body?: any): this

  /**
   * 返回一个渲染页面
   * @param view string
   * @param options object
   */
  render (view: string, options?: object): Promise<void>

  /**
   * 跳转一个URL
   * @param url 
   */
  redirect (url: string): void

  /**
   * 返回一个渲染异常页面
   * @param view 
   * @param options 
   */
  renderException (view: string, options?: object): void

  /**
   * 设置 cookie
   * @param name 
   * @param value 
   * @param options 
   */
  cookie (name: string, value: string, options?: any): this

  /**
   * 设置 Header
   * @param field 
   * @param val 
   */
  setHeader (field: string, val: string | string[]): void

  /**
   * 抛错误
   * @param properties 
   */
  throw (...properties: Array<number | string | {}>): never
  
}

export type NextHandler = CommonEngineOptions.NextHandler