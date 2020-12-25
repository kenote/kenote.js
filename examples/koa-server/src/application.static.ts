import { Module } from '@kenote/core'
import path from 'path'

@Module({
  statics: {
    '/': path.resolve(process.cwd(), 'public')
  }
})
export default class StaticModule {}