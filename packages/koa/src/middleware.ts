import Koa from 'koa'
import { RouterContext } from 'koa-router'
import { KoaEngine } from '..'
import Context from './context'
import { IncomingHttpHeaders } from 'http'

/**
 * 转换请求函式
 * @param handler 
 */
export function toRequestHandler (handler: KoaEngine.RequestHandler<Context>): Koa.Middleware {
  return (context: Koa.Context & RouterContext, next: Koa.Next) => {
    let ctx = new Context(context)
    return handler(ctx, nextHandler(next, ctx))
  }
}

/**
 * 转换错误函式
 * @param handler 
 */
export function toErrorHandler (handler: KoaEngine.ErrorHandler<Context>) {
  return (err: Error, ctx: Context) => {
    return handler(err, ctx)
  }
}

/**
 * 转换中间件
 * @param Middleware 
 */
export function toMiddleware (methods: Array<KoaEngine.Method<Context>>, headers?: IncomingHttpHeaders): Koa.Middleware {
  return (context: Koa.Context & RouterContext, next: Koa.Next) => {
    if (headers) {
      for (let [ name, value ] of Object.entries(headers)) {
        context.append(name, value!)
      }
    }
    for (let item of methods) {
      let { name, handler } = item
      let ctx = new Context(context)
      Context.prototype[name] = ctx.context[name] = handler(ctx)
    }
    return next()
  }
}

/**
 * 定义 NextHandler
 * @param next 
 * @param ctx 
 */
function nextHandler (next: Koa.Next, ctx: Context) {
  return (error?: any) => {
    if (error) {
      ctx.next(error)
    }
    else {
      return next()
    }
  }
}