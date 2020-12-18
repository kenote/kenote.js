import { getMetadataArgsStorage } from './metadata'
import { MiddlewareOptions } from '..'

/**
 * 类装饰器 -- 配置中间件
 * @param options 
 */
export function Middleware (options?: MiddlewareOptions): ClassDecorator {
  return (target: Object) => {
    getMetadataArgsStorage().middlewares.push({
      target,
      options
    })
  }
}

/**
 * 方法装饰器 -- 绑定方法
 * @param name 
 */
export function Bind (name?: string): MethodDecorator {
  return (target: object, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    getMetadataArgsStorage().actions.push({
      target: target.constructor,
      handler: descriptor.value,
      name: name || methodName
    })
  }
}
