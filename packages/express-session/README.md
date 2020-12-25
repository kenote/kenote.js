# @kenote/express-session

为 `@kenote/express` 封装的 `session` 插件

## 插件应用

`index.ts`
```ts
import { ServiceEngine } from '@kenote/express'
import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import { createClient } from 'redis'
import RoutesAPI from './routes/api'

const RedisStore = connectRedis(expressSession)

async function bootstarp () {
  let engine = new ServiceEngine({ keys: ['keys', 'keykeys'] })
  engine.register(session({
    secret: ['keys', 'keykeys'],
    store: new RedisStore({ client: createClient() }),
    resave: true,
    saveUninitialized: true
  }))()
  engine.register(RoutesAPI)('/api')

  engine.listen(4000)
}
```

`./routes/api.ts`
```ts
import { toRoutes } from '@kenote/express'
const routes = [
  {
    method: 'GET',
    routePath: '/',
    handler: [
      ctx => {
        if (ctx.session) {
          ctx.session.count = ctx.session.count || 0
          ctx.session.count++
        }
        ctx.json(ctx.session)
      }
    ]
  }
]

export default toRoutes(routes)
```

---
MIT License.