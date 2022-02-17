# @kenote/koa-passport

为 `@kenote/koa` 封装的 `passport` 插件

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/koa-passport.svg
[npm-url]: https://www.npmjs.com/package/@kenote/koa-passport
[downloads-image]: https://img.shields.io/npm/dm/@kenote/koa-passport.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/koa-passport
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## 插件应用

`index.ts`
```ts
import { ServiceEngine } from '@kenote/koa'
import passport from './plugins/passport'
import session from './plugins/session'
import RoutesAPI from './routes/api'

async function bootstarp () {
  let engine = new ServiceEngine({ keys: ['kenote'] })

  engine.register(...session)()
  engine.register(...passport)('passport')

  engine.register(RoutesAPI)('/api')

  engine.listen(4000)
}
```

`./plugins/session.ts`
```ts
import session from '@kenote/koa-session'
import redisStore from 'koa-redis'

export default session({
  store: redisStore({})
})
```

`./plugins/passport.ts`
```ts
import koaPassport from '@kenote/koa-passport'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

export default koaPassport()
```

`./routes/api.ts`
```ts
import { toRoutes } from '@kenote/koa'
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