import { Middleware, Action, Context, Property } from '@kenote/core'
import { HttpError } from 'http-errors'
import * as service from '~/services'
import { User } from '~/entities'
import { setJwToken } from './auth'
import { merge } from 'lodash'

@Middleware()
export default class Restful {
  @Action()
  api (ctx: Context) {
    return (data: any, error?: HttpError) => {
      if (error != null) {
        let { message } = error
        ctx.json({ error: message })
      } else {
        ctx.json({ data })
      }
    }
  }

  @Property()
  service (ctx: Context) {
    return service
  }

  /**
   * JET 登录
   */
  @Action()
  jwtLogin (ctx: Context) {
    return async (user: User) => {
      let jwtoken = setJwToken({ id: user.id })
      ctx.cookie('jwtoken', jwtoken)
      await service.mock.user.update({ id: user.id }, { jwtoken })
      return merge(user, { jwtoken })
    }
  }
}

declare module '@kenote/core' {
  interface Context {
    /**
     * 调用 API 出口
     * @param data
     * @param error
     */
    api (data: any, error?: HttpError): void
    /**
    * 调用 Services 接口
    */
    service: typeof service
    /**
     * JET 登录
     */
    jwtLogin (user: User): Promise<User>
  }
}
