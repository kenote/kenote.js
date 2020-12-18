import { IncomingHttpHeaders } from 'http'
import { CommonEngineOptions } from '@kenote/common'
export { Controller, Get, Post, Put, Delete } from '../src/controller'

export declare namespace IController {

  type MethodType = CommonEngineOptions.MethodType

  interface Route<T = any> {
    /**
     * 请求方式
     */
    method        : MethodType
    /**
     * 路由路径
     */
    routePath     : string | string[]
    /**
     * Handler
     */
    handler       : Array<RequestHandler<T>>
  }

  interface RouteOptions<T = any> {
    /**
     * 路由过滤器
     */
    filters      ?: Array<RequestHandler<T>>
    /**
     * 设置 Header 头
     */
    headers      ?: IncomingHttpHeaders
  }

  /**
   * 请求函式
   */
  type RequestHandler<Context = any, NextHandler = Promise<Function> | Function, Result = any> = (ctx: Context, next: NextHandler) => Promise<Result> | Result

}