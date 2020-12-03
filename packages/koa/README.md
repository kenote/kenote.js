# @kenote/koa

基于 `Koa` 服务端框架，同化操作、为 `@kenote/core` 或其他第三方模块整合。

## 创建服务

```ts

const engine = ServiceEngine()

// 设置静态文件目录
engine.staticDir = { rootDir: __dirname, rootPath: '/static' }

// 设置模版引擎
engine.template = { ... }

// 注册中间件
engine.register(/* */)()

// 启动服务
engine.app.listen(4000)
```

## 静态文件配置

```ts
/**
 * 物理路径
 */
rootDir: string = __dirname

/**
 * 路由路径
 */
rootPath: string = '/static'

/**
 * 配置选项; 查看 koa-static-cache 模块
 */
options: staticCache.Options = {}
```


## 模版配置

```ts
/**
 * 物理路径
 */
viewDir: string = __dirname + '/views'

/**
 * 模版引擎, 模版文件扩展名
 */
engine: string = 'html'

/**
 * 模版引擎配置
 */
configure = {
  /**
   * 自动渲染到 ctx.body 中
   */
  autoRender: true,
  /**
   * 模版文件扩展名
   */
  extension: 'html'
  /**
   * 将扩展名绑定到引擎
   */
  map: {
    html: 'lodash'
  }
}
```

## 处理中间件

```ts
/**
 * 创建错误中间件
 */
const errorHandler = (error: any, ctx: Context) => {
  ctx.status(500).send('This page could internal server error')
}

/**
 * 注册错误中间件
 */
engine.register(errorHandler)('error')

/**
 * 创建处理 NotFound 中间件
 */
const notFoundHandler = toRequestHandler(
  async (ctx, next) => {
    try {
      await next()
      if (ctx.statusCode === 404) {
        ctx.throw(404)
      }
    } catch (error) {
      if (error.message === 'Not Found') {
        ctx.status(404).send('This page could not be found.')
      } else {
        return next(error)
      }
    }
  }
)

/**
 * 注册处理 NotFound 中间件
 */
engine.register(notFoundHandler)()

/**
 * 创建自定义中间件
 */
toMiddleware(
  /**
   * 创建中间件方法
   */
  [
    /**
     * 创建 notfound 方法
     * 调用方法：ctx.notfound()
     */
    {
      name: 'notfound',
      handler: (ctx: Context) => {
        return async () => {
          await ctx.status(404).render('error', { message: 'This page could not be found' })
        }
      }
    }
    /**
     * 创建 api 方法
     * 调用方法：ctx.api(info, error)
     */
    {
      name: 'api',
      handler: (ctx: Context) => {
        return (info: any, error: Error) => {
          if (error) {
            let { code, message } = error
            ctx.json({ error: code, message })
          }
          else {
            ctx.json({ data: info })
          }
        }
      }
    }
  ],
  /**
   * 设置 Response.Headers
   */
  {
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Origin': '*'
  }
)

/**
 * 注册中间件
 * @param handlers -- 中间件
 */
engine.register(...handlers)()
```

## 处理路由控制器

```ts
/**
 * 创建路由控制器
 */
toRoutes(
  /**
   * 路由控制器
   * @param method -- 请求方式; GET ｜ POST ｜ PUT ｜ DELETE
   * @param routePath -- 请求路径; 
   * @param handler -- 绑定的函式; 支持上下文传递
   */
  [
    {
      method: 'GET',
      routePath: '/',
      handler: [
        (ctx: Context) => {
          ctx.send('info')
        }
      ]
    },
    {
      method: 'POST',
      routePath: '/:user',
      handler: [
        (ctx: Context, next: KoaEngine.NextHandler) => {
          ctx.payload = { ...ctx.params }
          return next()
        },
        async (ctx: Context, next: KoaEngine.NextHandler) => {
          try {
            ctx.json(ctx.payload)
          } catch (error) {
            return next(error)
          }
        }
      ]
    },
  ]
)

/**
 * 注册路由控制器
 * @param handlers -- 路由控制器
 * @param path -- 注册路径
 * @param options -- 路由选项
 */
engine.register(...handlers)(path?, options?)
```

---
MIT License.