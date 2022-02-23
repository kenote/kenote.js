import { Context, NextHandler } from '@kenote/core'
import { filterData, FilterData } from 'parse-string'
import { loadConfig } from '@kenote/config'

export async function login (ctx: Context, next: NextHandler) {
  let { nextError } = ctx.service
  try {
    let filters = loadConfig<Record<string, FilterData.options[]>>('config/filters/main.yml')
    ctx.payload = filterData(filters.login)(ctx.body)
    return await next()
  } catch (error) {
    nextError(error, ctx, next)
  }
}
