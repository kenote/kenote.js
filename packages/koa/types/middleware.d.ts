import { IncomingHttpHeaders } from 'http'
import { KoaEngine, Context } from './'
import Koa from 'koa'

export function toRequestHandler (handler: KoaEngine.RequestHandler<Context>): Koa.Middleware

export function toErrorHandler (handler: KoaEngine.ErrorHandler<Context>): KoaEngine.ErrorHandler<Context>

export function toMiddleware (methods: Array<KoaEngine.Method<Context>>, headers?: IncomingHttpHeaders): Koa.Middleware