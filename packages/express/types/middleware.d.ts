import { IncomingHttpHeaders } from 'http'
import { RequestHandler, ErrorRequestHandler } from 'express-serve-static-core'
import { ExpressEngine, Context } from './'

export function toMiddleware (methods: Array<ExpressEngine.Method<Context>>): RequestHandler
export function toMiddleware (methods: Array<ExpressEngine.Method<Context>>, headers: IncomingHttpHeaders): RequestHandler

export function toBasicHandler (handler: ExpressEngine.BasicHandler<Context>): RequestHandler

export function toErrorHandler (handler: ExpressEngine.ErrorHandler<Context>): ErrorRequestHandler

export function toRequestHandler (handler: ExpressEngine.RequestHandler<Context>): RequestHandler