import { ServiceEngine } from '../src'
import { errorHandler, notFoundHandler } from './plugins/error'
import { Restful } from './plugins/restful'
import RoutesAPI, { options as routerAPIOptions } from './routes/api'
import staticOptions from './plugins/static'
import templateOptions from './plugins/template'

async function bootstrap () {
  let engine = new ServiceEngine()
  engine.staticDir = staticOptions
  engine.template = templateOptions

  engine.register(Restful)()
  engine.register(RoutesAPI)('/api', routerAPIOptions)

  engine.register(notFoundHandler)('*')
  engine.register(errorHandler)()
  
  engine.app.listen(4000, () => {
    console.log(`starting...`)
  })
} 

bootstrap()