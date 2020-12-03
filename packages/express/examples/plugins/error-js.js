const errorhandler = require('errorhandler')
const { toBasicHandler, toErrorHandler } = require('../../')

/**
 * 处理错误
 */
exports.errorHandler = (() => {
  if (process.env.NODE_ENV === 'development') {
    return errorhandler()
  }
  return toErrorHandler(async (ctx, err) => {
    return await ctx.status(500).render('error', { message: 'This page could internal server error' })
  })
})()

/**
 * 处理 404 NotFound
 */
exports.notFoundHandler = toBasicHandler( 
  async ctx => {
    return await ctx.status(404).render('error', { message: 'This page could not be found.' })
  }
)
