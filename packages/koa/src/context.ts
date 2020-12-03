import Koa from 'koa'
import { RouterContext } from 'koa-router'
import Cookies from 'cookies'
import { compact, fromPairs, trim } from 'lodash'

export default class Context<ReqUser = any, Payload = any> {
  
  private __ctx: Koa.Context & RouterContext

  constructor (ctx: Koa.Context & RouterContext) {
    this.__ctx = ctx
  }
  
  /**
   * 获取 app
   */
  get app () {
    return this.__ctx.app
  }
  
  /**
   * 获取 context
   */
  get context () {
    return this.__ctx
  }

  /**
   * 设置 Payload; 作为上下文传递
   */
  set payload (value: Payload) {
    this.__ctx['$__payload'] = value
  }

  /**
   * 获取 Payload; 作为上下文传递
   */
  get payload () {
    return this.__ctx['$__payload']
  }

  /**
   * 获取 method
   */
  get method () {
    return this.__ctx.method
  }

  /**
   * 获取 protocol
   */
  get protocol () {
    return this.__ctx.protocol
  }

  /**
   * 获取 path
   */
  get path () {
    return this.__ctx.path
  }

  /**
   * 获取 url
   */
  get url () {
    return this.__ctx.url
  }

  /**
   * 获取 originalUrl
   */
  get originalUrl () {
    return this.__ctx.originalUrl
  }

  /**
   * 获取 hostname
   */
  get hostname () {
    return this.__ctx.hostname
  }

  /**
   * 获取 ip
   */
  get ip () {
    return this.__ctx.ip
  }

  /**
   * 获取 ips
   */
  get ips () {
    return this.__ctx.ips
  }

  /**
   * 获取 headers
   */
  get headers () {
    return this.__ctx.headers
  }

  /**
   * 获取 params
   */
  get params () {
    return this.__ctx.params
  }

  /**
   * 获取 query
   */
  get query () {
    return this.__ctx.query
  }

  /**
   * 获取 body
   */
  get body () {
    return this.__ctx.request.body
  }

  /**
   * 获取 cookies
   */
  get cookies () {
    let cookies = compact((this.__ctx.headers.cookie || '').split(/\;/)).map(trim).map( s => s.split(/\=/) )
    return fromPairs(cookies)
  }

  /**
   * 获取 statusCode
   */
  get statusCode () {
    return this.__ctx.response.status
  }

  /**
   * 发送信息
   * @param body any
   */
  send = (body?: any) => {
    this.__ctx.body = body
  }

  /**
   * 设置 HTTP 状态
   * @param code number
   */
  status = (code: number) => {
    this.__ctx.status = code
    return this
  }

  /**
   * 返回一个JSON格式的信息
   * @param body any
   */
  json = this.send

  /**
   * 返回一个渲染页面
   * @param view string
   * @param options object
   */
  render = (view: string, options?: object) => this.__ctx.render(view, options)

  /**
   * 跳转一个URL
   * @param url 
   */
  redirect = (url: string) => this.__ctx.redirect(url)

  /**
   * 设置 cookie
   * @param name 
   * @param value 
   * @param options 
   */
  cookie = (name: string, value: string, options?: Cookies.SetOption) => this.__ctx.cookies.set(name, value, options)

  /**
   * 错误传递
   * @param error 
   */
  next = (error: Error) => {
    this.__ctx.app.emit('error', error, this)
  }

  /**
   * 抛错误
   * @param properties 
   */
  throw = (...properties: Array<number | string | {}>) => this.__ctx.throw(...properties)
}

