import { Context, Controller, Get, NextHandler, Post } from '@kenote/core'
import { getEntrance, getProxyResponse } from '../../src'
import * as service from '../services'

const { getUser } = service

@Controller('/')
export default class MainController {

  @Get('/:channel/:pathLabel')
  @Post('/:channel/:pathLabel')
  @Get('/:channel/:pathLabel/:tag')
  @Post('/:channel/:pathLabel/:tag')
  async handler (ctx: Context, next: NextHandler) {
    let { channel, pathLabel } = ctx.params
    let sandbox: Record<string, unknown> = { service }
    try {
      let { 
        payload, 
        notFound, 
        isUser, 
        entrance, 
        setting, 
        authenticationState, 
        serviceModules,
        channelPath 
      } = await getEntrance({ channel, pathLabel, getUser, sandbox })(ctx, 'channels')
      if (notFound) return ctx.status(404)
      if (authenticationState?.type === 'jwt' && isUser === 'Unauthorized') return await ctx.status(401).send('Unauthorized')
      let [ type, result ] = await getProxyResponse(entrance, payload)({ serviceModules, setting, logger: console, ctx })
      if (entrance?.native) {
        ctx.setHeader('content-type', type)
        return ctx.send(result)
      }
      return ctx.json(result)
    } catch (error) {
      if (error?.code >= 1000) {
        ctx.json({ error: error.message })
      }
      else {
        return next(error)
      }
    }
  }
}
