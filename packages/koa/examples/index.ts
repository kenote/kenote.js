
import { ServiceEngine } from '../src'
import staticOptions from './plugins/static'
import templateOptions from './plugins/template'
import RoutesAPI, { options as routerAPIOptions } from './routes/api'
import { errorHandler, notFoundHandler } from './plugins/error'
import { Restful } from './plugins/restful'

async function bootstrap () {
  let engine = new ServiceEngine()
  engine.staticDir = staticOptions
  engine.template = templateOptions
  
  engine.register(Restful)()
  engine.register(RoutesAPI)('/api', routerAPIOptions)

  engine.register(notFoundHandler)()
  engine.register(errorHandler)('error')

  engine.app.listen(4000, () => {
    console.log(`starting...`)
  })
}

bootstrap()