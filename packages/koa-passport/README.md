# @kenote/koa-passport

Passport plug-in based on Koa for Kenote.js.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/koa-passport.svg
[npm-url]: https://www.npmjs.com/package/@kenote/koa-passport
[downloads-image]: https://img.shields.io/npm/dm/@kenote/koa-passport.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/koa-passport
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

`index.ts`
```ts
import { Module, ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/koa'
import session from '@kenote/koa-session'
import redisStore from 'koa-redis'
import passportPlugin from '@kenote/koa-passport'
import passport from 'koa-passport'
import { Strategy } from 'passport-local'

// Add Strategy
passport.use(new Strategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

@Module({
  imports: [],
  plugins: [
    session({
      store: redisStore(),
    }),
    passportPlugin()
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