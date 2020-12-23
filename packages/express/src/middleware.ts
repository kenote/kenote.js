import { ExpressEngine } from '../'
import { Request, Response, NextFunction } from 'express'
import Context from './context'
import { IncomingHttpHeaders } from 'http'

/**
 * 转换中间件
 * @param Middleware typeof Object
 */
export function toMiddleware (methods: Array<ExpressEngine.Method<Context>>, headers?: IncomingHttpHeaders) {
  return (req: Request, res: Response<any>, next: NextFunction) => {
    if (headers) {
      for (let [ name, value ] of Object.entries(headers)) {
        res.setHeader(name, value!)
      }
    }
    for (let item of methods) {
      let { name, handler, property } = item
      let ctx = new Context(req, res)
      if (handler) {
        Context.prototype[name] = res[name] = handler(ctx)
      }
      if (property) {
        Context.prototype[name] = res[name] = property
      }
    }
    return next()
  }
}

/**
 * 转换基础函式
 * @param handler 
 */
export function toBasicHandler (handler: ExpressEngine.BasicHandler<Context>) {
  return (req: Request, res: Response) => {
    let ctx = new Context(req, res)
    return handler(ctx)
  }
}

/**
 * 转换错误函式
 * @param handler 
 */
export function toErrorHandler (handler: ExpressEngine.ErrorHandler<Context>) {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    let ctx = new Context(req, res)
    return handler(err, ctx)
  }
}

/**
 * 转换请求函式
 * @param handler 
 */
export function toRequestHandler (handler: ExpressEngine.RequestHandler<Context>) {
  return (req: Request, res: Response, next: NextFunction) => {
    let ctx = new Context(req, res)
    return handler(ctx, next)
  }
}