import { KoaEngine, toRoutes, Context } from '@kenote/koa'

const routes: Array<KoaEngine.Route<Context>> = [
  {
    method: 'GET',
    routePath: '/',
    handler: [
      async ctx => {
        await ctx.login({ username: 'admin' })
        ctx.send('Hello')
      }
    ]
  },
  {
    method: 'GET',
    routePath: '/user',
    handler: [
      ctx => {
        ctx.json(ctx.user)
      }
    ]
  }
]

export default toRoutes(routes)