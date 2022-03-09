import { Plugin } from '@nuxt/types'
import { HttpClient, HeaderOptions, xhrClient } from '@kenote/common'

export const httpClient = <T = {}>(options?: HeaderOptions<T>) => new HttpClient(xhrClient(new XMLHttpRequest()), options)

export default <Plugin> ((ctx, inject) => {
  inject('httpClient', httpClient)
})

declare module 'vue/types/vue' {
  interface Vue {
    $httpClient: typeof httpClient
  }
}