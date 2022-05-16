import { Module } from '@kenote/core'
import MainController from './main'

@Module({
  path: '/',
  controller: [ MainController ],
  options: {
    // cros: true
  }
})
export default class RootControllerModule {}