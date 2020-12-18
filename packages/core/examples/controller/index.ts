import { Controller, Get, Post, Put, Delete } from '../../src'
import { Context, NextHandler } from '../..'
import { RestfulContext } from '../middleware/restful'
import * as DefaultFilter from '../filters'

@Controller()
export default class DefaultController {

  @Get('/')
  @Post('/')
  @Put('/')
  @Delete('/')
  helloWorld (ctx: Context) {
    ctx.send('Hello World!')
  }

  @Get('/query')
  getQuery (ctx: Context) {
    ctx.json(ctx.query)
  }

  @Get('/params/:t')
  getParams (ctx: Context) {
    ctx.json(ctx.params)
  }

  @Post('/body')
  getBody (ctx: Context) {
    ctx.json(ctx.body)
  }

  @Get('/info/:type(name|email)', {
    filters: [ DefaultFilter.setPayload ]
  })
  async getPayload (ctx: Context & RestfulContext, next: NextHandler) {
    try {
      if (ctx.payload.type === 'name') {
        ctx.throw(500, 'type is not an email')
      }
      ctx.api(ctx.payload)
    } catch (error) {
      if (error.code && error.code >= 1000) {
        ctx.api(null, error)
      }
      else {
        return next(error)
      }
    }
  }
}