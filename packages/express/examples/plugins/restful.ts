import { IncomingHttpHeaders } from 'http'
import { ExpressEngine } from '../..'
import { toMiddleware, Context } from '../../src'

const headers: IncomingHttpHeaders = {
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': '*'
}

const methods: Array<ExpressEngine.Method<Context>> = [
  {
    name: 'notfound',
    handler: ctx => async () => {
      await ctx.status(404).render('error', { message: 'This page could not be found' })
    }
  },
  {
    name: 'api',
    handler: ctx => {
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

export const Restful = toMiddleware(methods)

export interface Restful {
  notfound (): Promise<void>
  api (info: any, error?: Error): void
}