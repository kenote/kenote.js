import { Controller, Get, Post, Put, Delete, Context } from '@kenote/core'

@Controller('/user')
export default class UserController {

  @Get('/')
  helloWprld (ctx: Context) {
    console.log(ctx.session)
    ctx.send('Hello World!')
  }
}