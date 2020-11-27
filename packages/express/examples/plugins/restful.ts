import { IncomingHttpHeaders } from 'http'
import { ExpressEngine, toMiddleware, Context } from '../../'

const headers: IncomingHttpHeaders = {
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': '*'
}

const methods: Array<ExpressEngine.Method<Context>> = [
  {
    name: 'notfound',
    handler: (ctx: Context) => () => {
      ctx.status(404).render('error', { message: 'This page could not be found' })
    }
  },
  {
    name: 'api',
    handler: (ctx: Context) => {
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
]

export const Restful = toMiddleware(methods, headers)

export interface Restful {
  notfound (): void
  api (info: any, error?: Error): void
}