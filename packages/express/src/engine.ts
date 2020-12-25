import express, { Express, RequestHandler, ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import expressStaticGzip from 'express-static-gzip'
import { ExpressEngine } from '../'
import { isPlainObject } from 'lodash'
import cors from 'cors'
import { CommonEngine } from '@kenote/common'
import consolidate from 'consolidate'
import { toRequestHandler, toErrorHandler, toMiddleware } from './middleware'
import { toRoutes } from './router'
import errorhandler from 'errorhandler'

export class ServiceEngine extends CommonEngine<Express> {

  constructor (options?: ExpressEngine.Options) {
    super()
    let { bodyParser: bodyParserOptions, compress: compressOptions, keys } = options || {}
    let { json, urlencoded, text, raw } = bodyParserOptions || {}
    this.__application = express()
    this.__application.use(bodyParser.json({ limit: '1mb', ...json }))
    this.__application.use(bodyParser.urlencoded({ extended: true, limit: '1mb', ...urlencoded }))
    this.__application.use(bodyParser.text({ limit: '1mb', ...text }))
    this.__application.use(bodyParser.raw({ limit: '1mb', ...raw }))
    this.__application.use(methodOverride())
    this.__application.use(compress(compressOptions))
    this.__application.use(cookieParser(keys || ['keys', 'keykeys']))
  }

  /**
   * 获取名称
   */
  get name (): string {
    return 'express'
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
    let { viewDir, engine, extension } = value
    this.__application.engine(extension, consolidate[engine || 'lodash'])
    this.__application.set('views', viewDir)
    this.__application.set('view engine', extension)
  }

  /**
   * 注册中间件
   * @param handlers 
   */
  register (...handlers: Array<RequestHandler | ErrorRequestHandler>) {
    return (path?: string, options?: ExpressEngine.RequestOptions) => {
      if (path) {
        let { cors: corsOptions, headers  } = options || {}

        if (corsOptions) {
          handlers = [ isPlainObject(corsOptions) ? cors(corsOptions as cors.CorsOptions) : cors(), ...handlers ]
        }
        if (headers) {
          handlers = [ (req: Request, res: Response, next: NextFunction) => {
            for (let [ name, value ] of Object.entries(headers || {})) {
              res.setHeader(name, value!)
            }
            return next()
          }, ...handlers ]
        }
        this.__application.use(path, ...handlers)
      }
      else {
        this.__application.use(...handlers)
      }
    }
  }

  toRoutes = toRoutes.bind(this)
  toRequestHandler = toRequestHandler.bind(this)
  toErrorHandler = toErrorHandler.bind(this)
  toMiddleware = toMiddleware.bind(this)
  errorhandler = errorhandler.bind(this)

}