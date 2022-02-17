# @kenote/koa-session

为 `@kenote/koa` 封装的 `session` 插件

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/koa-session.svg
[npm-url]: https://www.npmjs.com/package/@kenote/koa-session
[downloads-image]: https://img.shields.io/npm/dm/@kenote/koa-session.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/koa-session
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

## 插件应用

`index.ts`
```ts
import { ServiceEngine } from '@kenote/app'
import session from '@kenote/koa-session'
import redisStore from 'koa-redis'
// Type definitions for koa-redis 3.0
import RoutesAPI from './routes/api'

async function bootstarp () {
  let engine = new ServiceEngine({ keys: ['keys', 'keykeys'] })
  engine.register(session({
    store: redisStore({})
  }))()
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