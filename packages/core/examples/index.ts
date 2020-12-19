import { ServerFactory } from '../src'
import { ServiceEngine } from '@kenote/express'
import ApplicationModule from './application.module'

async function bootstrap () {
  let server = await ServerFactory(new ServiceEngine()).create(ApplicationModule)
  server.app.listen(4000, () => {
    console.log('starting...')
  })
}

bootstrap()