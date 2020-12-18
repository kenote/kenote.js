import { Context, NextHandler } from '../..'

export function setPayload (ctx: Context, next: NextHandler) {
  ctx.payload = ctx.params
  return next()
}