const path = require('path')
const fs = require('fs')
const { template } = require('lodash')
const { toRequestHandler } = require('../../')
const templateOptions = require('./template-js')
const consolidate = require('consolidate')

/**
 * 处理错误
 */
exports.errorHandler = (error, ctx) => {
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
exports.notFoundHandler = toRequestHandler(
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