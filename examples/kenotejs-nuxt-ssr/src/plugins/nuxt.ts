import { merge } from 'lodash'
import { Nuxt } from '@nuxt/core'
import { Builder } from '@nuxt/builder'
import type { IModule } from '@kenote/core'
import { toRequestHandler } from '@kenote/koa'
import nuxtConfig from '@/nuxt.config'
import type { NuxtPayload, AuthInfo } from '@/types'
import { verifyJwToken } from '~/middlewares/auth'
import { mock, logger } from '~/services'

const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt(merge(nuxtConfig, { dev: !isProd }))

export default <IModule.ssrPlugin> {
  handler: [
    toRequestHandler((ctx, next) => {
      if (ctx.method !== 'GET') return
      let isNuxtPage = !/^(\/\_nuxt|\/__webpack_hmr)|(\.ico|\.png)$/.test(ctx.path)
      if (isNuxtPage) {
        ctx.payload = <NuxtPayload> {
          // ...
          getAuthInfo: async jwtoken => {
            try {
              let payload = verifyJwToken(jwtoken)
              if (payload) {
                let authInfo: AuthInfo = {}
                let user = await mock.user.findOne({ id: payload.id, jwtoken })
                authInfo.user = user
                return authInfo
              }
              return payload
            } catch (error) {
              logger.warn(error.message)
            }
          }
        }
      }
      return next()
    }),
    toRequestHandler(ctx => {
      ctx.status(200)
      ctx.context.respond = false
      ctx.req['$__payload'] = ctx.payload
      ctx.req.ctx = ctx.context
      nuxt.render(ctx.req, ctx.res)
    }),
  ],
  prescript: async () => {
    await nuxt.ready()
    if (!isProd) {
      let builder = new Builder(nuxt)
      await builder.build()
    }
  }
}
