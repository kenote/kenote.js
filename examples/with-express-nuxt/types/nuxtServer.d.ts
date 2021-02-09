import { Request } from 'express'

export declare interface HTTPServer {
  req   : Request & { $__payload: NuxtPayload }
}

export declare interface NuxtPayload {
  site_url     ?: string
}