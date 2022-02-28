import { Context, Controller, Get, NextHandler, Post } from '@kenote/core'
import { authenticate } from '~/plugins/passport'
import * as filter from '~/filters'

@Controller()
export default class MainController {
  
  @Post('/login', { filters: [filter.main.login] })
  async handleLogin (ctx: Context, next: NextHandler) {
    let { nextError, httpError, ErrorCode, db } = ctx.service
    let { username, password } = ctx.payload
    try {
      let result = await db.user.findOne({ username, password })
      if (result == null) {
        throw httpError(ErrorCode.ERROR_LOGINVALID_FAIL)
      }
      let user = await ctx.jwtLogin(result)
      return ctx.api(user)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }

  @Get('list', { filters: [ ...authenticate ] })
  async handleList (ctx: Context, next: NextHandler) {
    let { nextError, db } = ctx.service
    try {
      let result = await db.user.find()
      return ctx.api(result)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }
}
