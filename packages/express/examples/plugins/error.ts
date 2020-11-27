import errorhandler from 'errorhandler'
import { toErrorHandler, toBasicHandler } from '../../'

/**
 * 处理错误
 */
export const errorHandler = (() => {
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
export const notFoundHandler = toBasicHandler( 
  ctx => {
    return ctx.status(404).render('error', { message: 'This page could not be found.' })
  }
)