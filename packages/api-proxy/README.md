# @kenote/api-proxy

Automation API proxy module based on the Kenote.js framework.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/api-proxy.svg
[npm-url]: https://www.npmjs.com/package/@kenote/api-proxy
[downloads-image]: https://img.shields.io/npm/dm/@kenote/api-proxy.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/api-proxy
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

```ts
import { Context, Controller, Get, NextHandler, Post } from '@kenote/core'
import { getEntrance, getProxyResponse } from '@kenote/api-proxy'
import * as service from '../service'

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
        serviceModules 
      } = await getEntrance({ channel, pathLabel, getUser, sandbox })(ctx, 'channels')
      if (notFound) return ctx.status(404)
      if (authenticationState?.type === 'jwt' && isUser === 'Unauthorized') {
        return await ctx.status(401).send('Unauthorized')
      }
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
```

---
MIT License.