import { Router } from 'express'
import { ExpressEngine } from '..'
import { toRequestHandler } from './middleware'

/**
 * 转换路由配置
 * @param options 
 */
export function toRoutes (options: ExpressEngine.Route[]) {
  let router = Router()
  for (let route of options) {
    let { routePath, handler } = route
    let method = route.method.toLowerCase()
    router[method](routePath, ...handler.map( toRequestHandler ))
  }
  return router
}
