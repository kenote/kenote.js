import { ExpressEngine, toRoutes, Context } from '@kenote/express'

const routes: Array<ExpressEngine.Route<Context>> = [
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