import { Module } from '@kenote/core'
import path from 'path'

@Module({
  viewDir: path.resolve(process.cwd(), 'views'),
  engine: 'nunjucks',
  extension: 'njk'
})
export default class TemplateModule {}