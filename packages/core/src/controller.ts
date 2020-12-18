import path from 'path'
import { IController } from '../types/controller'
import { getMetadataArgsStorage } from './metadata'
import { isArray } from 'lodash'

/**
 * 类装饰器 -- 绑定控制器
 * @param baseRoute 
 */
export function Controller (baseRoute?: string): ClassDecorator {
  return (target: Object) => {
    getMetadataArgsStorage().controllers.push({
      target,
      baseRoute
    })
  }
}

/**
 * 方法装饰器 -- 绑定请求
 * @param type GET | POST | PUT | DELETE
 */
const createMethodDecorator = (type: IController.MethodType) => (route: string, options?: IController.RouteOptions): MethodDecorator => {
  return (target: Object, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    let { filters, headers } = options || {}
    getMetadataArgsStorage().actions.push({
      type,
      route,
      target: target.constructor,
      filters: filters || [],
      handler: descriptor.value
    })
  }
}
export const Get = createMethodDecorator('GET')
export const Post = createMethodDecorator('POST')
export const Put = createMethodDecorator('PUT')
export const Delete = createMethodDecorator('DELETE')

/**
 * 转换路由路径
 * @param baseRoute 
 * @param route 
 */
export function toRoutePath (baseRoute?: string) {
  return (route: string | string[]) => {
    if (isArray(route)) {
      return route.map( r => toRoutePath(baseRoute)(r) )
    }
    let routePath = path.join(baseRoute || '', route).replace(/\/$/, '')
    return /^\//.test(routePath) ? routePath : `/${routePath}`
  }
}