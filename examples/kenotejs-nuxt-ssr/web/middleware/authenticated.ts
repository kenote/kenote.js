import { Context } from '@nuxt/types'
import { get } from 'lodash'

export default async (context: Context) => {
  let { store, redirect, route } = context
  let auth = get(store.state, ['auth', 'auth'])
  if (!auth) {
    return redirect('/login', { url_callback: route.path })
  }
}