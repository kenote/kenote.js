const errorhandler = require('errorhandler')
const { toBasicHandler, toErrorHandler } = require('../../')

/**
 * 处理错误
 */
exports.errorHandler = (() => {
  if (process.env.NODE_ENV === 'development') {
    return errorhandler()
  }
  return toErrorHandler( (ctx, err) => {
    return ctx.status(500).render('error', { message: 'This page could internal server error' })
  })
})()

/**
 * 处理 404 NotFound
 */
exports.notFoundHandler = toBasicHandler( 
  ctx => {
    return ctx.status(404).render('error', { message: 'This page could not be found.' })
  }
)
