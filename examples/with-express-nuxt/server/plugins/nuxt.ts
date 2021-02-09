import { Nuxt, Builder } from 'nuxt'
import nuxtConfig from '../../nuxt.config'
import { IModule } from '@kenote/core'
import { toRequestHandler } from '@kenote/express'
import { NuxtPayload } from '@/types/nuxtServer'

const dev = process.env.NODE_ENV !== 'production'
const nuxt: Nuxt = new Nuxt({ ...nuxtConfig, dev })

async function nuxtReady () {
  await nuxt.ready()
  if (process.env.NODE_ENV === 'development') {
    let builder = new Builder(nuxt)
    await builder.build()
  }
}

const nuxtPulgin: IModule.ssrPlugin = {
  prefix: '/',
  handler: [
    toRequestHandler((ctx, next) => {
      let isNuxtPage = !/^(\/\_nuxt|\/__webpack_hmr)|(\.ico|\.png)$/.test(ctx.path)
      if (isNuxtPage) {
        ctx.payload = {
          site_url: 'http://localhost:4000'
        } as NuxtPayload
      }
      return next()
    }),
    nuxt.render
  ],
  prescript: nuxtReady
}
export default nuxtPulgin