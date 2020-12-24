import { IncomingHttpHeaders } from 'http'
export { Middleware, Action, Property } from '../src/middleware'

export declare interface MiddlewareOptions {
  headers   ?: IncomingHttpHeaders
}