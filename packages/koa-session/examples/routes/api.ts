import { KoaEngine, toRoutes, Context } from '@kenote/koa'

const routes: Array<KoaEngine.Route<Context>> = [
  {
    method: 'GET',
    routePath: '/',
    handler: [
      ctx => {
        if (ctx.session) {
          ctx.session.count = ctx.session.count || 0
          ctx.session.count++
        }
        ctx.json(ctx.session)
      }
    ]
  }
]

export default toRoutes(routes)