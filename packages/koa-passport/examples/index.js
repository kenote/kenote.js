const { ServiceEngine } = require('@kenote/koa')
const passport = require('./plugins/passport-js')
const session = require('./plugins/session-js')
const RoutesAPI = require('./routes/api-js')

async function bootstrap () {
  let engine = new ServiceEngine({ keys: ['kenote'] })
  engine.register(...session)()
  engine.register(...passport)('passport')
  engine.register(RoutesAPI)('/api')

  engine.app.listen(4000, () => {
    console.log(`starting...`)
  })
}

bootstrap()