# @kenote/express-passport

为 `@kenote/koa` 封装的 `passport` 插件

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