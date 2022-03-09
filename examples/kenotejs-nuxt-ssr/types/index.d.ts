import { IncomingMessage } from 'http'
import { Context } from '@nuxt/types'
import type { User } from '@/src/entities'

export declare interface NuxtServerContext extends Context {
  req  : IncomingMessage & { $__payload: NuxtPayload }
}

export declare interface NuxtPayload {
  getAuthInfo   ?: (token: string) => Promise<AuthInfo | null>
}

export declare interface AuthInfo {
  user   ?: User | null
}