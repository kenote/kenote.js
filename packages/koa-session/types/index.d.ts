import session from 'koa-generic-session'
import Koa from 'koa'

declare function koaSession (options?: session.SessionOptions): Koa.Middleware[]

export = koaSession

declare module '@kenote/koa' {
  interface Context {
    session: session.Session | null
    sessionSave: boolean | null
    regenerateSession(): Generator
  }
}