import { ServiceEngine } from '@kenote/koa'
import passport from './plugins/passport'
import session from './plugins/session'
import RoutesAPI from './routes/api'

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