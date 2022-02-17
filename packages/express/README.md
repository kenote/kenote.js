# @kenote/express

基于 `Express` 服务端框架，同化操作、为 `@kenote/core` 或其他第三方模块整合。

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/@kenote/express.svg
[npm-url]: https://www.npmjs.com/package/@kenote/express
[downloads-image]: https://img.shields.io/npm/dm/@kenote/express.svg
[downloads-url]: https://www.npmjs.com/package/@kenote/express
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/kenote.js/blob/main/LICENSE

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
 * 配置选项
 */
options: ExpressStaticGzipOptions = {
  /**
   * 默认索引文件（默认：'index.html'）
   * type: string
   */
  index: 'index.html',
  /**
   * 添加任何其他需要的压缩
   * @param encodingName -- 编码名称, 对照Accept-Header进行检查
   * @param fileExtension -- 文件扩展名
   */
  customCompressions: [
    {
      encodingName: 'gzip',
      fileExtension: 'gz'
    }
  ],
  /**
   * 允许用服务器端首选项覆盖客户端请求的编码首选项
   * 查阅 https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
   * type: string[]
   */
  orderPreference: ['br'],
  /**
   * 支持brotli压缩，使用文件扩展名'br'
   */
  enableBrotli: true,
  /**
   * ServeStaticOptions
   * https://github.com/expressjs/serve-static#options
   */
  serveStatic: {}
}
```

## 模版配置

```ts
/**
 * 物理路径
 */
viewDir: string = __dirname + '/views'

/**
 * 扩展名
 */
extension: string = 'html'

/**
 * 模版引擎
 */
engine: string = 'lodash'
```

## 处理中间件

```ts
/**
 * 创建基础中间件
 */
toBasicHandler( (ctx: Content) => {
  return ctx.status(404).send('This page could not be found.')
})

/**
 * 创建错误中间件
 */
toErrorHandler( (err: Error, ctx: Content) => {
  return ctx.status(500).send('This page could internal server error')
})

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
 * @param path -- 注册路径
 */
engine.register(...handlers)(path?)
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
        (ctx: Context, next: NextFunction) => {
          ctx.payload = { ...ctx.params }
          return next()
        },
        async (ctx: Context, next: NextFunction) => {
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