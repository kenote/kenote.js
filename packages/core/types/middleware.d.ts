import { IncomingHttpHeaders } from 'http'
export { Middleware, Bind } from '../src/middleware'

export declare interface MiddlewareOptions {
  headers   ?: IncomingHttpHeaders
}