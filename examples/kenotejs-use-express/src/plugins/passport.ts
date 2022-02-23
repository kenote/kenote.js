import expressPassport from '@kenote/express-passport'
import passport from 'passport'
import { Context } from '@kenote/express'
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
    Context.prototype.user = ctx.req.user
    return next()
  }
]

export default expressPassport()
