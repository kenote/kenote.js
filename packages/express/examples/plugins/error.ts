import errorhandler from 'errorhandler'
import { toErrorHandler, toBasicHandler } from '../..'

/**
 * 处理错误
 */
export const errorHandler = process.env.NODE_ENV === 'development' 
  ? errorhandler() 
  : toErrorHandler(async (err, ctx) => {
    return await ctx.status(500).render('error', { message: 'This page could internal server error' })
  })

/**
 * 处理 404 NotFound
 */
export const notFoundHandler = toBasicHandler( 
  async ctx => {
    return await ctx.status(404).render('error', { message: 'This page could not be found.' })
  }
)