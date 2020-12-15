import { CookieOptions, Request, Response } from 'express'
import createError from 'http-errors'

/**
 * 路由上下文 Context
 */
export default class Context<ReqUser = any, Payload = any> {

  private __req: Request
  private __res: Response

  constructor (req: Request, res: Response) {
    this.__req = req
    this.__res = res
  }

  get app () {
    return this.__req.app
  }

  /**
   * 获取 Request
   */
  get req () {
    return this.__req
  }

  /**
   * 获取 Response
   */
  get res () {
    return this.__res
  }

  /**
   * 设置 Payload; 作为上下文传递
   */
  set payload (value: Payload) {
    this.__req['$__payload'] = value
  }

  /**
   * 获取 Payload; 作为上下文传递
   */
  get payload () {
    return this.__req['$__payload']
  }

  /**
   * 设置 User
   */
  set user (value: ReqUser) {
    this.__req['user'] = value
  }

  /**
   * 获取 User
   */
  get user () {
    return this.__req['user']
  }

  /**
   * 获取 method
   */
  get method () {
    return this.__req.method
  }

  /**
   * 获取 protocol
   */
  get protocol () {
    return this.__req.protocol
  }

  /**
   * 获取入口 baseUrl
   */
  get baseUrl () {
    return this.__req.baseUrl
  }

  /**
   * 获取 path
   */
  get path () {
    return this.__req.path
  }

  /**
   * 获取 url
   */
  get url () {
    return this.__req.url
  }

  /**
   * 获取 originalUrl
   */
  get originalUrl () {
    return this.__req.originalUrl
  }

  /**
   * 获取 hostname
   */
  get hostname () {
    return this.__req.hostname
  }

  /**
   * 获取 ip
   */
  get ip () {
    return this.__req.ip
  }

  /**
   * 获取 ips
   */
  get ips () {
    return this.__req.ips
  }

  /**
   * 获取 headers
   */
  get headers () {
    return this.__req.headers
  }

  /**
   * 获取 params
   */
  get params () {
    return this.__req.params
  }

  /**
   * 获取 query
   */
  get query () {
    return this.__req.query
  }

  /**
   * 获取 body
   */
  get body () {
    return this.__req.body
  }

  /**
   * 获取 cookies
   */
  get cookies () {
    return this.__req.cookies
  }

  /**
   * 发送信息
   * @param body any
   */
  send = (body?: any) => this.__res.send(body)

  /**
   * 设置 HTTP 状态
   * @param code number
   */
  status = (code: number) => this.__res.status(code)

  /**
   * 发送一个文件
   * @param path string
   */
  sendFile = (path: string) => new Promise((resolve, reject) => {
    this.__res.sendFile(path, err => {
      if (err) {
        reject(err)
      }
      else {
        resolve(null)
      }
    })
  })

  /**
   * 返回一个JSON格式的信息
   * @param body any
   */
  json = (body?: any) => this.__res.json(body)

  /**
   * 返回一个JSONP格式的信息
   * @param body any
   */
  jsonp = (body?: any) => this.__res.jsonp(body)

  /**
   * 返回一个渲染页面
   * @param view string
   * @param options object
   */
  render = (view: string, options?: object) => new Promise((resolve, reject) => {
    this.__res.render(view, options, (err, html) => {
      if (err) {
        reject(err)
      }
      else {
        this.__res.send(html)
      }
    })
  })

  /**
   * 跳转一个URL
   * @param url 
   */
  redirect = (url: string) => this.__res.redirect(url)

  /**
   * 设置 cookie
   * @param name 
   * @param value 
   * @param options 
   */
  cookie = (name: string, value: string, options?: CookieOptions) => this.__res.cookie(name, value, options || {})

  /**
   * 抛错误
   * @param properties 
   */
  throw = (...properties: Array<number | string | {}>) => {
    throw createError(...properties)
  }
}