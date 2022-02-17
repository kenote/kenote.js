import { Context, toRequestHandler } from '@kenote/koa'
import session from 'koa-generic-session'

function koaSession (options?: session.SessionOptions) {
  return [
    session(options!),
    toRequestHandler((ctx, next) => {
      Context.prototype.session = ctx.context.session
      Context.prototype.sessionSave = ctx.context.sessionSave
      Context.prototype.regenerateSession = ctx.context.regenerateSession as unknown as () => Generator
      return next()
    })
  ]
}

export = koaSession