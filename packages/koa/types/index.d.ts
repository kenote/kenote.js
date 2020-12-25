/**
 * Typescript types
 */
import Koa from 'koa'
import staticCache from 'koa-static-cache'
import cors from '@koa/cors'
import Context from './context'
import { CommonEngineOptions } from '@kenote/common'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import Keygrip from 'keygrip'

export { ServiceEngine } from './engine'
export { toRoutes } from './router'
export { toRequestHandler, toMiddleware, toErrorHandler } from './middleware'
export { Context }
export { default as errorhandler } from './errorhandler'

export declare namespace KoaEngine {

  type app = Koa

  interface Options {
    keys         ?: Keygrip | string[]
    bodyParser   ?: bodyParser.Options
    compress     ?: compress.CompressOptions
  }

  /**
   * 静态服务选项
   */
  type StaticOptions = CommonEngineOptions.StaticDir<staticCache.Options>

  /**
   * 视图模版选项
   */
  type TemplateOptions = CommonEngineOptions.Template

  /**
   * 中间件选项
   */
  type RequestOptions = CommonEngineOptions.RequestOptions<cors.Options>

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
  type RequestHandler<T = Context, N = NextHandler, Result = any> = CommonEngineOptions.RequestHandler<T, N, Result>

  /**
   * 错误函式
   */
  type ErrorHandler<T = Context> = CommonEngineOptions.ErrorHandler<T, Response | void>

  /**
   * 基础函式
   */
  type BasicHandler<T = Context, Result = any> = CommonEngineOptions.BasicHandler<T, Result>

  /**
   * Next 函式
   */
  type NextHandler = CommonEngineOptions.NextHandler
}