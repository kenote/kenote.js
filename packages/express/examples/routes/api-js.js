const { toRoutes } = require('../../')

const routes = [
  {
    method: 'GET',
    routePath: '/',
    handler: [
      ctx => {
        ctx.send('Hello World!')
      }
    ]
  },
  {
    method: 'POST',
    routePath: '/',
    handler: [
      ctx => {
        ctx.send('Hello World!')
      }
    ]
  },
  {
    method: 'PUT',
    routePath: '/',
    handler: [
      ctx => {
        ctx.send('Hello World!')
      }
    ]
  },
  {
    method: 'DELETE',
    routePath: '/',
    handler: [
      ctx => {
        ctx.send('Hello World!')
      }
    ]
  },
  {
    method: 'GET',
    routePath: '/query',
    handler: [
      ctx => {
        ctx.json(ctx.query)
      }
    ]
  },
  {
    method: 'GET',
    routePath: '/params/:t',
    handler: [
      ctx => {
        ctx.json(ctx.params)
      }
    ]
  },
  {
    method: 'POST',
    routePath: '/body',
    handler: [
      ctx => {
        ctx.json(ctx.body)
      }
    ]
  },
  {
    method: 'GET',
    routePath: '/info/:type(name|email)',
    handler: [
      (ctx, next) => {
        ctx.payload = ctx.params
        return next()
      },
      async (ctx, next) => {
        try {
          if (ctx.payload.type === 'name') {
            let error = new Error('type is not an email')
            throw error
          }
          ctx.api(ctx.payload)
        } catch (error) {
          return next(error)
        }
      }
    ]
  },
]

module.exports = toRoutes(routes)

exports.options = {
  cors: true,
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Origin': '*'
  }
}