import { Context } from '@kenote/koa'
import compose from 'koa-compose'
import session from 'koa-generic-session'
import Koa from 'koa'

function koaSession (options?: session.SessionOptions): Koa.Middleware {
  return compose([
    session(options!),
    (context: Koa.Context, next: Koa.Next) => {
      Context.prototype.session = context.session
      Context.prototype.sessionSave = context.sessionSave
      Context.prototype.regenerateSession = context.regenerateSession
      return next()
    }
  ])
}

export = koaSession