import express, { Express, RequestHandler, ErrorRequestHandler } from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compress from 'compression'
import expressStaticGzip from 'express-static-gzip'
import { ExpressEngine } from '../'

export class ServiceEngine {

  private __application: Express

  constructor () {
    this.__application = express()
    this.__application.use(bodyParser.json({ limit: '1mb' }))
    this.__application.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
    this.__application.use(methodOverride())
    this.__application.use(compress())
  }

  /**
   * 获取名称
   */
  get name (): string {
    return 'express'
  }

  /**
   * 获取 app
   */
  get app (): Express {
    return this.__application
  }

  /**
   * 设置静态目录
   */
  set staticDir (value: ExpressEngine.StaticOptions) {
    let { rootDir, rootPath, options } = value
    this.__application.use(rootPath || '/', expressStaticGzip(rootDir, options || {}))
  }

  /**
   * 设置模版
   */
  set template (value: ExpressEngine.TemplateOptions) {
    let { viewDir, engine, configure } = value
    this.__application.set('views', viewDir)
    this.__application.set('view engine', engine)
    configure(this.__application)
  }

  use = (...handlers: Array<RequestHandler | ErrorRequestHandler>) => this.__application.use(...handlers)

  /**
   * 注册中间件
   * @param handlers 
   */
  register (...handlers: Array<RequestHandler | ErrorRequestHandler>) {
    return (path?: string) => {
      if (path) {
        this.__application.use(path, ...handlers)
      }
      else {
        this.__application.use(...handlers)
      }
    }
  }
}
