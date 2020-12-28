import { Context, toRequestHandler } from '@kenote/koa'
import passport from 'koa-passport'

function koaPassport () {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
  return [
    passport.initialize(),
    passport.session(),
    toRequestHandler((ctx, next) => {
      Context.prototype.user = ctx.context.state?.user
      Context.prototype.login = Context.prototype.logIn = ctx.context.login.bind(ctx.context)
      Context.prototype.logout = Context.prototype.logOut = ctx.context.logout.bind(ctx.context)
      Context.prototype.isAuthenticated = ctx.context.isAuthenticated.bind(ctx.req)
      Context.prototype.isUnauthenticated = ctx.context.isUnauthenticated.bind(ctx.req)
      return next()
    })
  ]
}

export = koaPassport