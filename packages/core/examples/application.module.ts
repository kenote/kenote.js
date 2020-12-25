import { Module } from '../src'
import { Context } from '..'
import StaticModule from './application.static'
import TemplateModule from './application.template'
import ControllerModule from './application.controller'
import Restful from './middleware/restful'

@Module<any>({
  imports: [ StaticModule, TemplateModule, ControllerModule ],
  plugins: [],
  middlewares: [ Restful ],
  httpException: {
    notFound: async ctx => {
      return await ctx.status(404).render('error', { message: 'This page could not be found.' })
    },
    exception: (err, ctx: Context) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  }
})
export default class AppModule {}
