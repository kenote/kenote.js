import koaPassport from '@kenote/koa-passport'
import passport from 'passport'
import { Context } from '@kenote/koa'
import { strategyJwt } from '~/middlewares/auth'

// Add Strategy
passport.use(strategyJwt)

/**
 * JWT 认证
 * @param ctx
 * @param next
 */
export const authenticate = [
  (ctx: Context, next: (...args: any[]) => any) => passport.authenticate('jwt', { session: false })(ctx.req, ctx.res, next),
  (ctx: Context, next: (...args: any[]) => any) => {
    Context.prototype.user = ctx.context.state?.user
    return next()
  }
]

export default koaPassport()
