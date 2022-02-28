import { Module, Context } from '@kenote/core'
import sessionPlugin from '~/plugins/session'
import passportPlugin from '~/plugins/passport'
import apolloPlugin from '~/plugins/apollo'
import Restful from './middlewares/restful'
import RootControllerModule from '~/controller'
import path from 'path'

@Module({
  statics: {
    '/': path.resolve(process.cwd(), 'static')
  },
  options: {
    dynamic: true
  }
})
class StaticModule {}

@Module({
  viewDir: path.resolve(process.cwd(), 'views'),
  engine: 'nunjucks',
  extension: 'njk'
})
class TemplateModule {}

@Module({
  // 功能模块
  imports: [StaticModule, TemplateModule, RootControllerModule],
  // 插件
  plugins: [sessionPlugin, passportPlugin],
  // 中间件
  middlewares: [Restful],
  //
  ssrPlugins: [apolloPlugin],
  // 异常处理
  httpException: {
    notFound: async (ctx: Context) => {
      return await ctx.status(404).render('error', { message: 'This page could not be found.' })
    },
    exception: (err: any, ctx: Context) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  }
})
export default class AppModule {}
