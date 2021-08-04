import { Context, toRequestHandler } from '@kenote/express'
import passport from 'passport'

function expressPassport () {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser<{}>((user, done) => done(null, user))
  return [
    passport.initialize(),
    passport.session(),
    toRequestHandler((ctx, next) => {
      Context.prototype.authInfo = ctx.req.authInfo
      Context.prototype.user = ctx.req.user
      Context.prototype.login = Context.prototype.logIn = (user, options) => {
        return new Promise((resolve, reject) => {
          ctx.req.login.call(ctx.req, user, options, err => {
            if (err) reject(err)
            else resolve()
          })
        })
      }
      Context.prototype.logout = Context.prototype.logOut = ctx.req.logout.bind(ctx.req)
      Context.prototype.isAuthenticated = ctx.req.isAuthenticated.bind(ctx.req)
      Context.prototype.isUnauthenticated = ctx.req.isUnauthenticated.bind(ctx.req)
      return next()
    }),
  ]
}

export = expressPassport