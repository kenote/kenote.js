import { Module } from '../src'
import { ExpressEngine } from '@kenote/express'
import DefaultController from './controller'

@Module<ExpressEngine.RequestOptions>({
  path: '/api',
  controller: [ DefaultController ],
  options: {
    cors: true
  }
})
export default class ControllerModule {}