# @kenote/koa-session

为 `@kenote/koa` 封装的 `session` 插件

## 插件应用

`index.ts`
```ts
import { ServiceEngine } from '@kenote/app'
import session from '@kenote/koa-session'
import redisStore from 'koa-redis'
// Type definitions for koa-redis 3.0
import RoutesAPI from './routes/api'

session({
  store: redisStore({})
})

async function bootstarp () {
  let engine = new ServiceEngine({ keys: ['keys', 'keykeys'] })
  engine.register(session({
    store: redisStore({})
  }))
  engine.register(RoutesAPI)('/api')

  engine.listen(4000)
}
```

`./routes/api.ts`
```ts
import { toRoutes } from '@kenote/koa'
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