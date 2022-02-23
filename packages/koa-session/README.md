# @kenote/koa-session

Session plug-in based on Koa for Kenote.js.


[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/koa-session.svg
[npm-url]: https://www.npmjs.com/package/@kenote/koa-session
[downloads-image]: https://img.shields.io/npm/dm/@kenote/koa-session.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/koa-session
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

`index.ts`
```ts
import { Module, ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/koa'
import session from '@kenote/koa-session'
import redisStore from 'koa-redis'

@Module({
  imports: [],
  plugins: [
    session({
      store: redisStore(),
    })
  ],
})
class AppModule {}

async bootstarp () {
  let factory = await ServerFactory(new ServiceEngine()).create(AppModule)
  factory.server.listen(4000)
}
```

---
MIT License.