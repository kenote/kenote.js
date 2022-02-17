# @kenote/express-passport

为 `@kenote/express` 封装的 `passport` 插件

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/express-passport.svg
[npm-url]: https://www.npmjs.com/package/@kenote/express-passport
[downloads-image]: https://img.shields.io/npm/dm/@kenote/express-passport.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/express-passport
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## 插件应用

`index.ts`
```ts
import { ServiceEngine } from '@kenote/express'
import passport from './plugins/passport'
import session from './plugins/session'
import RoutesAPI from './routes/api'

async function bootstarp () {
  let engine = new ServiceEngine({ keys: 'kenote' })

  engine.register(...session('kenote'))()
  engine.register(...passport)('passport')

  engine.register(RoutesAPI)('/api')

  engine.listen(4000)
}
```

`./plugins/session.ts`
```ts
import session from '@kenote/express-session'
import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import { createClient } from 'redis'

const RedisStore = connectRedis(expressSession)

export default (keys: string | string[]) => session({
  secret: keys,
  store: new RedisStore({ client: createClient() }),
  resave: true,
  saveUninitialized: true
})
```

`./plugins/passport.ts`
```ts
import expressPassport from '@kenote/express-passport'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

export default expressPassport()
```


`./routes/api.ts`
```ts
import { toRoutes } from '@kenote/express'
const routes = [
  {
    method: 'GET',
    routePath: '/',
    handler: [
      async ctx => {
        await ctx.login({ username: 'admin' })
        ctx.json(ctx.user)
      }
    ]
  }
]

export default toRoutes(routes)
```

---
MIT License.