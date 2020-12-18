import { Module } from '../src'
import path from 'path'


@Module({
  viewDir: path.resolve(__dirname, 'views'),
  engine: 'lodash',
  extension: 'html'
})
export default class TemplateModule {}