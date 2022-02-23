# @kenote/core

The core library of the Kenote.js.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/core.svg
[npm-url]: https://www.npmjs.com/package/@kenote/core
[downloads-image]: https://img.shields.io/npm/dm/@kenote/core.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/core
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

```ts
import { Module, ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/koa'

@Module({
  imports: [],
  plugins: [],
  middlewares: [],
  httpException: {
    notFound: (ctx: Context) => {
      return ctx.status(404)
    },
    exception: (err: any, ctx: Context) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  }
})
class AppModule {}

async bootstarp () {
  let factory = await ServerFactory(new ServiceEngine()).create(AppModule)
  factory.server.listen(4000)
}
```

### Controller

```ts
import { Context, Controller, Get, NextHandler, Post } from '@kenote/core'


@Controller()
class MainController {

  @Get('/path')
  async handle (ctx: Context, next: NextHandler) {
    // ...
  }

  @Post('/path')
  async handle (ctx: Context, next: NextHandler) {
    // ...
  }

  @Put('/path')
  async handle (ctx: Context, next: NextHandler) {
    // ...
  }

  @Delete('/path')
  async handle (ctx: Context, next: NextHandler) {
    // ...
  }
}
```

### Middleware

```ts
import { Middleware, Action, Context, Property } from '@kenote/core'
import { HttpError } from 'http-errors'

const service = {
  // ...
}

@Middleware()
class Restful {

  @Action()
  api (ctx: Context) {
    return (data: any, error?: HttpError) => {
      if (error != null) {
        let { message } = error
        ctx.json({ error: message })
      } else {
        ctx.json({ data })
      }
    }
  }

  @Property()
  service (ctx: Context) {
    return service
  }
}

declare module '@kenote/core' {
  interface Context {

    api (data: any, error?: HttpError): void
    
    service: typeof service
  }
}
```


---
MIT License.