/**
 * Typescript types
 */
import { ExpressStaticGzipOptions } from 'express-static-gzip'
import { Response, NextFunction, Express } from 'express'
import Context from './context'
import cors from 'cors'
import { CommonEngineOptions } from '@kenote/common'

export { ServiceEngine } from './engine'
export { toRoutes } from './router'
export { toBasicHandler, toRequestHandler, toErrorHandler, toMiddleware } from './middleware'
export { Context }

export declare namespace ExpressEngine {

  type app = Express

  /**
   * 静态服务选项
   */
  type StaticOptions = CommonEngineOptions.StaticDir<ExpressStaticGzipOptions>

  /**
   * 视图模版选项
   */
  type TemplateOptions = CommonEngineOptions.Template

  /**
   * 中间件选项
   */
  type RequestOptions = CommonEngineOptions.RequestOptions<cors.CorsOptions>

  /**
   * 路由单元
   */
  type Route<T = any> = CommonEngineOptions.Route<T>

  /**
   * 中间件方法
   */
  type Method<T = Context> = CommonEngineOptions.Method<T>

  /**
   * 请求函式
   */
  type RequestHandler<T = Context, N = NextFunction, Result = any> = CommonEngineOptions.RequestHandler<T, N, Result>

  /**
   * 基础函式
   */
  type BasicHandler<T = Context, Result = any> = CommonEngineOptions.BasicHandler<T, Result>

  /**
   * 错误函式
   */
  type ErrorHandler<T = Context> = CommonEngineOptions.ErrorHandler<T, Response | void>

  /**
   * Next 函式
   */
  type NextHandler = NextFunction
  
}
