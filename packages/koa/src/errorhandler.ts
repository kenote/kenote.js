import path from 'path'
import fs from 'fs'
import { inspect } from 'util'
import escapeHtml from 'escape-html'
import Context from './context'
import accepts from 'accepts'
import { KoaEngine } from '..'
import { pick } from 'lodash'

const DOUBLE_SPACE_REGEXP = /\x20{2}/g
const NEW_LINE_REGEXP = /\n/g
const TEMPLATE = fs.readFileSync(path.join(__dirname, '../public/error.html'), 'utf8')

const defer = typeof setImmediate === 'function'
  ? setImmediate
  : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)) }

const escapeHtmlBlock = str => escapeHtml(str).replace(DOUBLE_SPACE_REGEXP, ' &nbsp;').replace(NEW_LINE_REGEXP, '<br>')

interface Options {
  log   ?: boolean
}

export default function errorhandler (options?: Options): KoaEngine.ErrorHandler {
  let env = process.env.NODE_ENV || 'development'
  let log: any = options?.log === undefined ? env !== 'test' : options.log

  if (typeof log !== 'function' && typeof log !== 'boolean') {
    throw new TypeError('option log must be function or boolean')
  }

  if (log === true) {
    log = (err, str) => {
      console.error(str || err.stack)
    }
  }

  return (err, ctx) => {
    ctx = 'context' in ctx ? ctx : new Context(ctx)
    ctx.status(err.status || 500)
    let str = stringify(err)
    let accept = accepts(ctx.req)
    let type = accept.type('html', 'json', 'text')
    defer(log, err, str, ctx)

    // html
    if (type === 'html') {
      let isInspect = !err.stack && String(err) === toString.call(err)
      let errorHtml = !isInspect
        ? escapeHtmlBlock(str.split('\n', 1)[0] || 'Error')
        : 'Error'
      let stack = !isInspect
        ? String(str).split('\n').slice(1)
        : [str]
      let stackHtml = stack
        .map(function (v) { return '<li>' + escapeHtmlBlock(v) + '</li>' })
        .join('')
      let body = TEMPLATE
        .replace('{stack}', stackHtml)
        .replace('{statusCode}', String(ctx.statusCode))
        .replace('{title}', escapeHtml('Connect'))
        .replace(/\{error\}/g, errorHtml)

      ctx.setHeader('Content-Type', 'text/html; charset=utf-8')
      ctx.send(body)
    }
    // json
    else if (type === 'json') {
      let error = pick(err, [ ...Object.keys(err), 'stack' ])
      ctx.setHeader('Content-Type', 'application/json; charset=utf-8')
      ctx.json({ error })
    }
    // plain text
    else {
      ctx.setHeader('Content-Type', 'text/plain; charset=utf-8')
      ctx.send(str)
    }
  }
}

/**
 * 将错误信息转换为字符串
 * @param err 
 */
function stringify (err: Error): string {
  let {stack} = err
  if (stack) {
    return String(stack)
  }
  let str = String(err)
  return str === toString.call(err) ? inspect(err) : str
}