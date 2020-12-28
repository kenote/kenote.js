const { toRoutes } = require('@kenote/koa')

const routes = [
  {
    method: 'GET',
    routePath: '/',
    handler: [
      async ctx => {
        await ctx.login({ username: 'admin1' })
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

module.exports = toRoutes(routes)