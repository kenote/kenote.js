import { Module } from '@kenote/core'
import RootControllerModule from './controller'

@Module({
  imports: [ RootControllerModule ]
})
export default class AppModule {}