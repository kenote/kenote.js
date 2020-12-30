
import { loadModules } from './module'
import { getMetadataArgsStorage } from './metadata'
import { CommonEngine } from '@kenote/common'
import { isFunction } from 'lodash'

class ServerFactoryStatic<T = any> {

  private __engine: T

  constructor (ServiceEngine: T) {
    this.__engine = ServiceEngine
  }

  get engine () {
    return this.__engine
  }

  /**
   * 创建模块
   * @param module 
   */
  async create (module: Function) {
    // 初始化模块
    await loadModules(module)
    let $__engine = this.__engine as unknown as CommonEngine
    let { staticServer, routeController, templateOptions, httpException, middleware, plugins, ssrPlugins } = getMetadataArgsStorage().application
    // 处理静态文件
    if (staticServer) {
      let { statics, options } = staticServer
      for (let [rootPath, rootDir] of Object.entries(statics)) {
        $__engine.staticDir = { rootDir, rootPath, options }
      }
    }
    // 处理模版引擎
    if (templateOptions) {
      $__engine.template = templateOptions
    }
    // 处理插件
    if (plugins) {
      for (let item of plugins) {
        let __path = (item[0] as Function).name === 'initialize' ? 'passport' : undefined
        $__engine.register(...item)(__path)
      }
    }
    // 处理中间件
    if (middleware && isFunction($__engine.toMiddleware)) {
      for (let item of middleware) {
        $__engine.register($__engine.toMiddleware(item.methods, item.options?.headers))()
      }
    }
    // 处理路由控制器
    if (isFunction($__engine.toRoutes)) {
      for (let item of routeController) {
        $__engine.register($__engine.toRoutes(item.routes))(item.path || '/', item.options)
      }
    }
    // 处理SSR插件
    if (ssrPlugins) {
      for (let item of ssrPlugins) {
        let { handler, prescript } = item
        if (prescript) {
          await prescript()
        }
        $__engine.register(...handler)()
      }
    }
    // 处理 HTTP 异常
    if (httpException) {
      let { notFound, exception } = httpException
      if (notFound && $__engine.toRequestHandler && isFunction($__engine.toRequestHandler)) {
        let path = $__engine.name === 'express' ? '*' : undefined
        $__engine.register($__engine.toRequestHandler(notFound))(path)
      }
      if (exception && $__engine.toErrorHandler && isFunction($__engine.toErrorHandler)) {
        let path = $__engine.name === 'koa' ? 'error' : undefined
        let errorhandler = process.env.NODE_ENV === 'development'
          ? $__engine.errorhandler()
          : $__engine.toErrorHandler(exception)
        $__engine.register(errorhandler)(path)
      }
    }
    getMetadataArgsStorage().reset()
    return this.__engine
  }

}

export function ServerFactory <T = CommonEngine>(engine: T) { 
  return new ServerFactoryStatic<T>(engine)
}