import { Context } from '@nuxt/types'
import { get } from 'lodash'

export default async (context: Context) => {
  let { store, redirect, route } = context
  let auth = get(store.state, ['auth', 'auth'])
  if (auth) {
    let { url_callback } = route.query
    return redirect(<string>url_callback ?? '/')
  }
}