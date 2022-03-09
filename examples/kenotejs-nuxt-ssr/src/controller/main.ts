import { Context, Controller, Get, NextHandler, Post } from '@kenote/core'
import { authenticate } from '~/plugins/passport'
import * as filter from '~/filters'

@Controller()
export default class MainController {

  @Post('/login', { filters: [ filter.main.login ] })
  async handleLogin (ctx: Context, next: NextHandler) {
    let { nextError, httpError, ErrorCode, mock } = ctx.service
    let { username, password } = ctx.payload
    try {
      let result = await mock.user.findOne({ username, password })
      if (result == null) {
        throw httpError(ErrorCode.ERROR_LOGINVALID_FAIL)
      }
      let user = await ctx.jwtLogin(result)
      return ctx.api(user)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }

  @Get('/logout', { filters: [ ...authenticate ] })
  async handleLogout (ctx: Context, next: NextHandler) {
    let { nextError, mock } = ctx.service
    try {
      await mock.user.update({ id: ctx.user.id }, { jwtoken: '' })
      ctx.logout()
      ctx.cookie('jwtoken', '')
      return ctx.api({ result: true })
    } catch (error) {
      nextError(error, ctx, next)
    }
  }

  @Get('list', { filters: [ ...authenticate ] })
  async handleList (ctx: Context, next: NextHandler) {
    let { nextError, mock } = ctx.service
    try {
      let result = await mock.user.find()
      return ctx.api(result)
    } catch (error) {
      nextError(error, ctx, next)
    }
  }
}
