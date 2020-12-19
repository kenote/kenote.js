# @kenote/core

减少 `Express` 与 `Koa` 之间的差异化，平和转移义务代码。

## 创建服务

```ts
import { ServerFactory } from '@kenote/core'
import ApplicationModule from './application.module'

async function bootstrap () {
  // 加载服务端引擎
  let { ServiceEngine } = await import('@kente/express')
  // 创建服务并加载模块
  let server = await ServerFactory(new ServiceEngine()).create(ApplicationModule)
  // 将服务监听到 4000 端口
  server.app.listen(4000)
}

// 启动服务
bootstrap()
```

## 定义模块

主模块
```ts
import { Module } from '@kenote/core'

@Module({
  // 加载其他模块，如静态模块、模版模块和控制器模块
  imports: [ ... ],
  // 加载中间件
  middlewares: [ ... ],
  // 定义HTTP异常处理
  httpException: {
    // 404 Not Found
    notFound: async ctx => {
      return await ctx.status(404).render('error', { message: 'This page could not be found.' })
    },
    // 5xx Internal ServerError
    exception: (err, ctx) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  }
})
export default class ApplicationModule {}
```

静态模块
```ts
import { Module } from '@kenote/core'
import path from 'path'

@Module({
  statics: {
    '/static': path.resolve(__dirname, 'static')
  }
})
export default class StaticModule {}
```

模版模块
```ts
import { Module } from '@kenote/core'
import path from 'path'

@Module({
  // 模版路径
  viewDir: path.resolve(__dirname, 'views'),
  // 模版引擎，需要通过 npm 安装相应模块
  engine: 'lodash',
  // 模版扩展名
  extension: 'html'
})
export default class TemplateModule {}
```

控制器模块
```ts
import { Module } from '@kenote/core'

@Module({
  // 挂载的主路径
  path: '/api',
  // 加载的路由控制器
  controller: [ ... ],
  // 控制器选项
  options: {
    // 跨域设置
    cors: true,
    // 定义 HTTP 头信息
    headers: {}
  }
})
export default class ControllerModule {}
```

## 中间件

```ts
import { Context, Middleware, Bind } from '@kenote/core'

@Middleware({
  // 定义 HTTP 头信息
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE'
  }
})
export default class Restful {

  /**
   * 绑定中间件方法
   */
  @Bind('notfound')
  notfound (ctx: Context) {
    return async () => {
      await ctx.status(404).render('error', { message: 'This page could not be found' })
    }
  }

  /**
   * 绑定中间件方法
   * 不指定名称，就直接使用方法名
   */
  @Bind()
  api (ctx: Context) {
    return (info: any, error?: Error) => {
      if (error) {
        let { message } = error
        ctx.json({ error: message })
      }
      else {
        ctx.json({ data: info })
      }
    }
  }
}

/**
 * 定义中间件 Context
 */
export declare interface RestfulContext {
  notfound (): Promise<void>
  api (info: any, error?: Error): void
}
```


## 路由控制器

```ts
import { Controller, Get, Post, Put, Delete, Context, NextHandler } from '@kenote/core'

/**
 * 设置主路径
 */
@Controller('/user')
export default class UserController {

  /**
   * 将方法绑定到路由上，支持多个绑定
   */
  @Get('/', {
    // 绑定过滤器
    filters: [ ... ]
  })
  getList(ctx: Context, next: NextHandler) {
    // ...
    ctx.send('info')
  }
}
```

---
MIT License.