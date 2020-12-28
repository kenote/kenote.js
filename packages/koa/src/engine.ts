import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import compose from 'koa-compose'
import staticCache from 'koa-static-cache'
import Router from '@koa/router'
import cors from '@koa/cors'
import views from 'koa-views'
import { isPlainObject } from 'lodash'
import { KoaEngine } from '../'
import { CommonEngine } from '@kenote/common'
import { toRequestHandler, toMiddleware, toErrorHandler } from './middleware'
import { toRoutes } from './router'
import errorhandler from './errorhandler'

export class ServiceEngine extends CommonEngine<Koa> {

  constructor (options?: KoaEngine.Options) {
    super()
    let { bodyParser: bodyParserOptions, compress: compressOptions, keys } = options || {}
    this.__application = new Koa()
    this.__application.use(bodyParser(bodyParserOptions))
    this.__application.use(compress(compressOptions))
    this.__application.keys = keys || ['keys', 'keykeys']
  }

  /**
   * 获取名称
   */
  get name (): string {
    return 'koa'
  }
  
  /**
   * 设置静态目录
   */
  set staticDir (value: KoaEngine.StaticOptions) {
    let { rootDir, rootPath, options } = value
    this.__application.use(staticCache(rootDir, { ...options, prefix: rootPath || '/' }))
  }

  /**
   * 设置模版
   */
  set template (value: KoaEngine.TemplateOptions) {
    let { viewDir, engine, extension } = value
    this.__application.context.views = value
    this.__application.use(views(viewDir, {
      extension,
      map: {
        [extension]: engine || 'lodash'
      }
    }))
  }

  /**
   * 注册中间件
   * @param handler 
   */
  register (...handler: Array<Koa.Middleware | Router | KoaEngine.ErrorHandler>) {
    return (path?: string, options?: KoaEngine.RequestOptions) => {
      let { cors: corsOptions, headers } = options || {}
      if (path === 'error') {
        this.__application.on(path, handler[0] as KoaEngine.ErrorHandler)
      }
      else if (path === 'passport') {
        for (let _handler of handler) {
          this.__application.use(_handler as Koa.Middleware)
        }
      }
      else {
        let router: Router | undefined
        let handlers = handler.map( __handler => {
          if (__handler instanceof Router) {
            router = __handler
            if (path) {
              __handler.prefix(path)
            }
            return __handler.routes()
          }
          return __handler
        })
        if (corsOptions) {
          handlers = [ isPlainObject(corsOptions) ? cors(corsOptions as cors.Options) : cors(), ...handlers ]
        }
        if (headers) {
          handlers = [ (ctx, next) => {
            for (let [ name, value ] of Object.entries(headers || {})) {
              ctx.append(name, value!)
            }
            return next()
          }, ...handlers ]
        }
        this.__application.use(compose(handlers as Koa.Middleware[]))
        if (router) {
          this.__application.use(router.allowedMethods())
        }
      }
    }
  }

  toRoutes = toRoutes.bind(this)
  toRequestHandler = toRequestHandler.bind(this)
  toErrorHandler = toErrorHandler.bind(this)
  toMiddleware = toMiddleware.bind(this)
  errorhandler = errorhandler.bind(this)
  
}