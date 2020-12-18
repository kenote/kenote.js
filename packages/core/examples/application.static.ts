import { Module } from '../src'
import path from 'path'


@Module({
  statics: {
    '/static': path.resolve(__dirname, 'static')
  }
})
export default class StaticModule {}