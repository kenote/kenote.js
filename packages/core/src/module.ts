import 'reflect-metadata'
import { IModule, Metadata } from '..'
import { getMetadataArgsStorage } from './metadata'
import { CommonEngineOptions } from '@kenote/common'
import { toRoutePath } from './controller'

const MODULE_METADATA = 'MODULE'

export function Module <Options = any>(options: IModule.Options<Options>): ClassDecorator {
  return (target: Object) => {
    Reflect.defineMetadata(MODULE_METADATA, options, target)
  }
}

/**
 * 加载模块
 * @param module 
 */
export async function loadModules (module: Function): Promise<void> {
  let options = Reflect.getMetadata(MODULE_METADATA, module) || {}
  if ('imports' in options) {
    let { imports } = options
    for (let item of imports) {
      await loadModules(item)
    }
  }
  // 处理路由控制器
  else if ('controller' in options) {
    getMetadataArgsStorage().application.routeController.push({
      path: (options as IModule.Controller).path,
      routes: await getRoutes(options),
      options: (options as IModule.Controller).options
    })
  }
  // 处理静态文件
  else if ('statics' in options) {
    getMetadataArgsStorage().application.staticServer = options
  }
  // 处理模版引擎
  else if ('viewDir' in options) {
    getMetadataArgsStorage().application.templateOptions = options
  }
  // 处理插件
  if ('plugins' in options) {
    getMetadataArgsStorage().application.plugins = [ ...options.plugins ]
  }
  // 处理中间件
  if ('middlewares' in options) {
    let { middlewares } = getMetadataArgsStorage()
    getMetadataArgsStorage().application.middleware = []
    for (let middleware of middlewares) {
      let actions = getMetadataArgsStorage().actions.filter( o => o.target === middleware.target ) as CommonEngineOptions.Method[]
      let methods: CommonEngineOptions.Method[] = []
      for (let action of actions) {
        methods.push({
          name: action.name,
          handler: action.handler,
          property: action.property
        })
      }
      getMetadataArgsStorage().application.middleware?.push({
        methods,
        options: middleware.options
      })
    }
  }
  // 处理 SSR 插件
  if ('ssrPlugins' in options) {
    getMetadataArgsStorage().application.ssrPlugins = options.ssrPlugins
  }
  // 处理 HTTP 异常
  if ('httpException' in options) {
    getMetadataArgsStorage().application.httpException = options.httpException
  }
}

/**
 * 获取路由配置
 * @param options 
 */
async function getRoutes (options: IModule.Controller) {
  let controllers = getMetadataArgsStorage().controllers.filter( o => options.controller.includes(o.target) )
  let routes: CommonEngineOptions.Route[] = []
  for (let controller of controllers) {
    let { target, baseRoute } = controller
    let actions = getMetadataArgsStorage().actions.filter( o => o.target === target )
    let handlers = await getActiions(actions as Metadata.ActionArgs[], baseRoute)
    routes = [ ...routes, ...handlers ]
  }
  return routes
}

/**
 * 获取控制器绑定的方法
 * @param actions 
 * @param baseRoute 
 */
async function getActiions (actions: Metadata.ActionArgs[], baseRoute?: string) {
  let routes: CommonEngineOptions.Route[] = []
  for (let action of actions) {
    let { type, route, handler, filters } = action
    routes.push({
      method: type,
      routePath: toRoutePath(baseRoute)(route),
      handler: [ ...filters || [], handler! ]
    })
  }
  return routes
}