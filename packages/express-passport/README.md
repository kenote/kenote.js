# @kenote/express-passport

Passport plug-in based on Express for Kenote.js.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/express-passport.svg
[npm-url]: https://www.npmjs.com/package/@kenote/express-passport
[downloads-image]: https://img.shields.io/npm/dm/@kenote/express-passport.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/express-passport
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

`index.ts`
```ts

import { Module, ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/express'
import session from '@kenote/express-session'
import { MemoryStore } from 'express-session'
import passportPlugin from '@kenote/express-passport'
import passport from 'passport'
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
      secret: 'secret name',
      store: new MemoryStore(),
      resave: true,
      saveUninitialized: true
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