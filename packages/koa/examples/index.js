const { ServiceEngine } = require('../')
const { Restful } = require('./plugins/restful-js')
const { notFoundHandler, errorHandler } = require('./plugins/error-js')
const RoutesAPI = require('./routes/api-js')
const routerAPIOptions = require('./routes/api-js').options
const staticOptions = require('./plugins/static-js')
const templateOptions = require('./plugins/template-js')

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