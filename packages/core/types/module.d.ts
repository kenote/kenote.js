import { CommonEngine, CommonEngineOptions } from '@kenote/common'
export { Module, loadModules } from '../src/module'

export declare namespace IModule {

  interface Application {
    /**
     * 挂载模块
     */
    imports         : Function[]
    /**
     * 挂载插件
     */
    plugins        ?: Object[][]
    /**
     * 挂载中间件
     */
    middlewares    ?: Function[]
    /**
     * 
     */
    ssrPlugins     ?: ssrPlugin[]
    /**
     * HTTP 异常
     */
    httpException  ?: HttpException
  }

  interface ssrPlugin {
    /**
     * 绑定前缀
     */
    prefix         ?: string
    /**
     * Handler
     */
    handler         : Object[]
    /**
     * 前置脚本
     */
    prescript      ?: (engina: CommonEngine) => Promise<void>
  }

  /**
   * 静态文件模块
   */
  interface StaticServer<Options = any> {
    /**
     * 静态目录配置
     */
    statics         : Record<string, string>
    /**
     * 选项
     */
    options        ?: Options
  }

  /**
   * 模版模块
   */
  type TemplateOptions = CommonEngineOptions.Template

  /**
   * 控制器模块
   */
  interface Controller<Options = any> {
    /**
     * 挂载路径
     */
    path            : string
    /**
     * 挂载的控制器
     */
    controller      : Object[]
    /**
     * 控制器选项
     */
    options        ?: Options
  }

  /**
   * HTTP 异常
   */
  interface HttpException {
    /**
     * 404 Not Found
     */
    notFound       ?: CommonEngineOptions.RequestHandler
    /**
     * 其他异常
     */
    exception      ?: ErrorHandler
  }

  type ErrorHandler<T = any> = (err: Error, ctx: T) => Promise<any> | any

  type Options<Options = any> = Application
    | StaticServer<Options>
    | TemplateOptions
    | Controller<Options>
}