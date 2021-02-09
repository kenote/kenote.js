import expressPassport from '@kenote/express-passport'
import passport from 'passport'
import { Context } from '@kenote/express'
import { strategyJwt } from '~/middlewares/auth'

// Add Strategy
passport.use(strategyJwt)

export default expressPassport()

/**
 * JWT 认证
 * @param ctx 
 * @param next 
 */
export const authenticate = async (ctx: Context, next) => {
  passport.authenticate('jwt', { session: false })(ctx.req, ctx.res)
  ctx.user = ctx.req.user
}