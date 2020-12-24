import { IController } from './controller'
import { IModule } from './module'
import { CommonEngineOptions } from '@kenote/common'
import { MiddlewareOptions } from './middleware'
export { getMetadataArgsStorage } from '../src/metadata'

export declare namespace Metadata {
  /**
   * Controller MetaData
   */
  interface ControllerArgs {
    /**
     * 目标对象
     */
    target       : Object
    /**
     * 主路径
     */
    baseRoute   ?: string
  }
  /**
   * Action MetaData
   */
  interface ActionArgs<Handler = CommonEngineOptions.RequestHandler> {
    /**
     * Method
     */
    type          : IController.MethodType
    /**
     * 路由路径
     */
    route         : string | string[]
    /**
     * 所在目标控制器
     */
    target        : Object
    /**
     * 绑定的控制器方法
     */
    handler      ?: Handler
    /**
     * 绑定的属性
     */
    property     ?: Handler
    /**
     * 挂载的过滤器
     */
    filters      ?: Array<Handler>
  }
  /**
   * Middleware metaData
   */
  interface MiddlewareArgs {
    /**
     * 目标对象
     */
    target        : Object
    /**
     * 中间件选项
     */
    options      ?: MiddlewareOptions
  }
  /**
   * 
   */
  interface BindActionArgs<Handler = CommonEngineOptions.BasicHandler> {
    /**
     * 所在目标对象
     */
    target        : Object
    /**
     * 绑定的对象方法
     */
    handler      ?: Handler
    /**
     * 绑定的名称
     */
    name          : string
  }


  /**
   * Application
   */
  interface Application {
    /**
     * 静态文件模块
     */
    staticServer     ?: IModule.StaticServer
    /**
     * 模版系统
     */
    templateOptions  ?: IModule.TemplateOptions
    /**
     * 路由控制器
     */
    routeController   : RouteController[]
    /**
     * 中间件
     */
    middleware       ?: Middleware[]
    /**
     * HttpException
     */
    httpException    ?: IModule.HttpException
  }

  /**
   * 路由控制器
   */
  interface RouteController {
    /**
     * 主路径
     */
    path             : string
    /**
     * 路由配置
     */
    routes           : CommonEngineOptions.Route[]
    /**
     * 路由选项
     */
    options         ?: CommonEngineOptions.RequestOptions
  }

  /**
   * 中间件
   */
  interface Middleware {
    /**
     * 中间件方法
     */
    methods          : CommonEngineOptions.Method[]
    /**
     * 中间件选项
     */
    options         ?: MiddlewareOptions
  }
}