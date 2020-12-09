import path from 'path'
import fs from 'fs'
import { template } from 'lodash'
import { Context, toRequestHandler } from '../..'
import templateOptions from './template'
import consolidate from 'consolidate'

/**
 * 处理错误
 */
export const errorHandler = (error: any, ctx: Context) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }
  let { viewDir, extension } = templateOptions
  let tpl = fs.readFileSync(path.resolve(viewDir, `error.${extension || 'html'}`), 'utf-8')
  consolidate.lodash.render(tpl, { message: 'This page could internal server error' }, (err, html) => {
    ctx.status(500).send(html)
  })
}

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
        await ctx.status(404).render('error', { message: 'This page could not be found.'})
      } else {
        return next(error)
      }
    }
  }
)