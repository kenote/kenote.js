import { Context, toRequestHandler } from '@kenote/express'
import session from 'express-session'

function expressSession (options?: session.SessionOptions) {
  return [
    session(options),
    toRequestHandler((ctx, next) => {
      Context.prototype.session = ctx.req.session
      Context.prototype.sessionID = ctx.req.sessionID
      return next()
    })
  ]
}

export = expressSession