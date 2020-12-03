/**
 * Typescript types
 */
import { ExpressStaticGzipOptions } from 'express-static-gzip'
import { Response, NextFunction, Express } from 'express'
import Context from './context'
import { IncomingHttpHeaders } from 'http'
import cors from 'cors'

export { ServiceEngine } from './engine'
export { toRoutes } from './router'
export { toBasicHandler, toRequestHandler, toErrorHandler, toMiddleware } from './middleware'
export { Context }

export declare namespace ExpressEngine {

  type app = Express

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
     * 参数选项；查看 express-static-gzip 模块
     */
    options      ?: ExpressStaticGzipOptions
  }

  /**
   * 视图模版选项
   */
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
    configure     : (app: Express) => void
  }

  /**
   * 中间件选项
   */
  interface RequestOptions {
    /**
     * Cors 跨域选项
     */
    cors         ?: cors.CorsOptions | true
    /**
     * 设置 Headers
     */
    headers      ?: IncomingHttpHeaders
  }

  /**
   * 路由单元
   */
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

  /**
   * 中间件方法
   */
  interface Method<T = Context> {
    /**
     * 名称
     */
    name          : string
    /**
     * Handler
     */
    handler       : BasicHandler<T, Function>
  }

  /**
   * 请求函式
   */
  type RequestHandler<T = Context, Result = any> = (ctx: T, next: NextFunction) => Promise<Result> | Result

  /**
   * 基础函式
   */
  type BasicHandler<T = Context, Result = any> = (ctx: T) => Promise<Result> | Result

  /**
   * 错误函式
   */
  type ErrorHandler<T = Context> = (ctx: T, err: Error) => Promise<Response | void> | Response | void
  
}
