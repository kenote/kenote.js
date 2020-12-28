import { ServiceEngine } from '@kenote/express'
import passport from './plugins/passport'
import session from './plugins/session'
import RoutesAPI from './routes/api'

async function bootstrap () {
  let engine = new ServiceEngine({ keys: 'kenote' })
  
  engine.register(...session('kenote'))()
  engine.register(...passport)('passport')

  engine.register(RoutesAPI)('/api')

  engine.app.listen(4000, () => {
    console.log(`starting...`)
  })
}

bootstrap()