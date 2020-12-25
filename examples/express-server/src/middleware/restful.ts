import { Middleware, Action, Context } from '@kenote/core'


@Middleware({
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE'
  }
})
export default class Restful {

  @Action()
  notfound (ctx: Context) {
    return async () => {
      await ctx.status(404)
    }
  }
}

declare module '@kenote/core' {
  interface Context {
    notfound (): Promise<void>
  }
}