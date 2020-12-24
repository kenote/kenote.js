
import { Context } from '../..'
import { Middleware, Action } from '../../src'

@Middleware({
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE'
  }
})
export default class Restful {

  @Action('notfound')
  notfound (ctx: Context) {
    return async () => {
      await ctx.status(404).render('error', { message: 'This page could not be found' })
    }
  }

  @Action()
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


export declare interface RestfulContext {
  notfound (): Promise<void>
  api (info: any, error?: Error): void
}

