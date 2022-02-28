import { Module } from '@kenote/core'
import MainController from './main'

@Module({
  path: '/',
  controller: [MainController]
})
export default class RootControllerModule {}
