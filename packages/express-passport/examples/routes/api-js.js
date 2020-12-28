const { toRoutes } = require('@kenote/express')

const routes = [
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

module.exports = toRoutes(routes)