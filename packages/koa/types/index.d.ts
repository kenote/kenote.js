/**
 * Typescript types
 */
import Koa from 'koa'
import staticCache from 'koa-static-cache'
import cors from '@koa/cors'
import Context from './context'
import { IncomingHttpHeaders } from 'http'

export { ServiceEngine } from './engine'
export { toRoutes } from './router'
export { toRequestHandler, toMiddleware } from './middleware'
export { Context }

export declare namespace KoaEngine {

  type app = Koa

  /**
   * 静态服务选项
   */
  interface StaticOptions {
    /**
     * 物理路径
     */
    rootDir       : string
    /**
     * 指向路径
     */
    rootPath     ?: string
    /**
     * 参数选项；查看 koa-static-cache 模块
     */
    options      ?: staticCache.Options
  }

  interface TemplateOptions {
    /**
     * 模版物理路径
     */
    viewDir       : string
    /**
     * 模版引擎
     */
    engine        : string
    /**
     * 
     */
    configure     : {
      /*
      * autoRender the result into ctx.body, defaults to true
      */
      autoRender?: boolean
      /*
      * default extension for your views
      */
      extension?: string
      /*
      * these options will get passed to the view engine
      */
      options?: any
      /*
      * map a file extension to an engine
      */
      map?: any
      /*
      * replace consolidate as default engine source
      */
      engineSource?: any
    }
  }

  /**
   * 中间件选项
   */
  interface RequestOptions {
    /**
     * Cors 跨域选项
     */
    cors         ?: cors.Options | true
    /**
     * 设置 Headers
     */
    headers      ?: IncomingHttpHeaders
  }

  interface Route<T = Context> {
    /**
     * 请求方式
     */
    method        : 'GET' | 'POST' | 'PUT' | 'DELETE'
    /**
     * 路由路径
     */
    routePath     : string | RegExp
    /**
     * Handler
     */
    handler       : Array<RequestHandler<T>>
  }

  interface Method<T = Context> {

    name          : string

    handler       : BasicHandler<T, Function>
  }

  /**
   * 请求函式
   */
  type RequestHandler<T = Context, Result = any> = (ctx: T, next: NextHandler) => Promise<Result> | Result

  /**
   * 错误函式
   */
  type ErrorHandler<T = Context> = (err: Error, ctx?: T) => void

  /**
   * 基础函式
   */
  type BasicHandler<T = Context, Result = any> = (ctx: T) => Promise<Result> | Result

  // type NextHandler<T = Context> = (next: Koa.Next, ctx: T) => (error?: any) => Promise<any> | any
  /**
   * Next 函式
   */
  type NextHandler = (error?: any) => Promise<void> | void
}