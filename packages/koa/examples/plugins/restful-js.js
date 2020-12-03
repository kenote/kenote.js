const { toMiddleware } = require('../../')

const headers = {
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': '*'
}

const methods = [
  {
    name: 'notfound',
    handler: ctx => async () => {
      await ctx.status(404).render('error', { message: 'This page could not be found' })
    }
  },
  {
    name: 'api',
    handler: ctx => {
      return (info, error) => {
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

exports.Restful = toMiddleware(methods, headers)