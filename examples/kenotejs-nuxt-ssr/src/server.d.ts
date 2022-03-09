/// <reference types="node" />

declare module '@nuxt/core' {
  import type { NuxtConfig } from '@nuxt/types'
  import type { IncomingMessage, ServerResponse } from 'http'

  class Nuxt {

    constructor (config: NuxtConfig)

    ready (): Promise<this>

    render (req: IncomingMessage, res: ServerResponse): void
  }
}

declare module '@nuxt/builder' {
  import type { Nuxt } from '@nuxt/core'
  
  class Builder {
    
    constructor (nuxt: Nuxt)

    build (): Promise<void>
  }
}