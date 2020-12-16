import { IncomingHttpHeaders } from 'http'
import { KoaEngine } from '../..'
import { Context, toMiddleware } from '../../src'

const headers: IncomingHttpHeaders = {
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': '*'
}

const methods: Array<KoaEngine.Method<Context>> = [
  {
    name: 'notfound',
    handler: (ctx: Context) => async () => {
      await ctx.status(404).render('error', { message: 'This page could not be found' })
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
  notfound (): Promise<void>
  api (info: any, error?: Error): void
}