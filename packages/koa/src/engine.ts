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

export class ServiceEngine {

  private __application: Koa

  constructor () {
    this.__application = new Koa()
    this.__application.use(bodyParser())
    this.__application.use(compress())
  }

  /**
   * 获取名称
   */
  get name (): string {
    return 'koa'
  }

  /**
   * 获取 app
   */
  get app (): Koa {
    return this.__application
  }
  
  /**
   * 设置静态目录
   */
  set staticDir (value: KoaEngine.StaticOptions) {
    let { rootDir, rootPath, options } = value
    this.__application.use(staticCache(rootDir, { ...options, prefix: rootPath || '/' }))
  }

  set template (value: KoaEngine.TemplateOptions) {
    let { viewDir, engine, configure } = value

    this.__application.use(views(viewDir, {
      extension: engine,
      ...configure
    }))
    // this.__application.use( ctx => {
    //   ctx.state.engine = 'lodash'
    // })
  }

  use = (handler: Koa.Middleware) => this.__application.use(handler)

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
}