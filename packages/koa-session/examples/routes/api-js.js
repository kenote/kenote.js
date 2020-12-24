const { toRoutes } = require('@kenote/koa')

const routes = [
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

module.exports = toRoutes(routes)