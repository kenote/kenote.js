import { IncomingHttpHeaders } from 'http'

export declare class CommonEngine<T = Object> {

  protected __application: T

  /**
   * 获取名称
   */
  get name (): string

  /**
   * 获取 app
   */
  get app (): T

  /**
   * 设置静态目录
   */
  set staticDir (value: CommonEngineOptions.StaticDir)

  /**
   * 设置模版
   */
  set template (value: CommonEngineOptions.Template)

  /**
   * 注册中间件
   * @param handlers 
   */
  register (...handlers: Array<Function | Object>): (path?: string, options?: CommonEngineOptions.RequestOptions) => void

  /**
   * 转换路由配置
   * @param options 
   */
  toRoutes (options: CommonEngineOptions.Route[]): any

  /**
   * 转换请求函式
   * @param handler 
   */
  toRequestHandler (handler: CommonEngineOptions.RequestHandler): Function

  /**
   * 转换错误函式
   * @param handler 
   */
  toErrorHandler(handler: CommonEngineOptions.ErrorHandler): Function

  /**
   * 转换中间件
   * @param Middleware typeof Object
   */
  toMiddleware (methods: Array<CommonEngineOptions.Method>, headers?: IncomingHttpHeaders): Function

  /**
   * 开发环境错误函式
   * @param options 
   */
  errorhandler (options?: { log: boolean }): CommonEngineOptions.ErrorHandler
}

export declare namespace CommonEngineOptions {

  type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

  interface StaticDir<T = any> {
    /**
     * 物理路径
     */
    rootDir       : string
    /**
     * 指向路径
     */
    rootPath     ?: string
    /**
     * 参数选项
     */
    options      ?: T
  }

  interface Template {
    /**
     * 模版物理路径
     */
    viewDir       : string
    /**
     * 模版引擎
     */
    engine       ?: string
    /**
     * 扩展名
     */
    extension     : string
  }

  /**
   * 中间件选项
   */
  interface RequestOptions<T = object> {
    /**
     * Cors 跨域选项
     */
    cors         ?: T | true
    /**
     * 设置 Headers
     */
    headers      ?: IncomingHttpHeaders
  }

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

  /**
   * 中间件方法
   */
  interface Method<T = any> {
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
   * 基础函式
   */
  type BasicHandler<T = any, Result = any> = (ctx: T) => Promise<Result> | Result

  /**
   * 请求函式
   */
  type RequestHandler<T = any, N = NextHandler, Result = any> = (ctx: T, next: N) => Promise<Result> | Result
  
  /**
   * Next 函式
   */
  type NextHandler = (error?: any) => Promise<void> | void

  /**
   * 错误函式
   */
  type ErrorHandler<T = any, Result = any> = (Error, ctx: T) => Promise<Result> | Result
}