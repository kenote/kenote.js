# @kenote/koa

Using Koa web framework to Kenote.js.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/koa.svg
[npm-url]: https://www.npmjs.com/package/@kenote/koa
[downloads-image]: https://img.shields.io/npm/dm/@kenote/koa.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/koa
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

`index.ts`
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

---
MIT License.