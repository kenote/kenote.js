import { toRequestHandler, toErrorHandler, errorhandler } from '../../src'

/**
 * 处理错误
 */
export const errorHandler = process.env.NODE_ENV === 'development'
  ? errorhandler()
  : toErrorHandler( (error, ctx) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  )

/**
 * 处理 404 NotFound
 */
export const notFoundHandler = toRequestHandler(
  async (ctx, next) => {
    try {
      await next()
      if (ctx.statusCode === 404 && !ctx.context.response.body) {
        ctx.throw(404)
      }
    } catch (error) {
      if (error.message === 'Not Found') {
        await ctx.status(404).render('error', { message: 'This page could not be found.' })
      } else {
        return next(error)
      }
    }
  }
)