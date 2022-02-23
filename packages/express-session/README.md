# @kenote/express-session

Session plug-in based on Express for Kenote.js.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/express-session.svg
[npm-url]: https://www.npmjs.com/package/@kenote/express-session
[downloads-image]: https://img.shields.io/npm/dm/@kenote/express-session.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/express-session
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## Usage

`index.ts`
```ts
import { Module, ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/express'
import session from '@kenote/express-session'
import { MemoryStore } from 'express-session'

@Module({
  imports: [],
  plugins: [
    session({
      secret: 'secret name',
      store: new MemoryStore(),
      resave: true,
      saveUninitialized: true
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