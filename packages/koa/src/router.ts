import Router from '@koa/router'
import { KoaEngine } from '../'
import { toRequestHandler } from './middleware'


export function toRoutes (options: KoaEngine.Route[]) {
  let router = new Router()
  for (let route of options) {
    let { routePath, handler } = route
    let method = route.method.toLowerCase()
    router[method](routePath, ...handler.map( toRequestHandler ))
  }
  return router
}