import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState, Types } from './'
import { NuxtServerContext } from '@/types'
import { compact, trim, fromPairs, get, isFunction } from 'lodash'

export interface State extends Record<string, any> {}

export const state = (): State => ({})

export const getters: GetterTree<State, RootState> = {}

export const mutations: MutationTree<State> = {}

export interface Actions<S, R> extends ActionTree<S, R> {
  /**
   * 处理服务器预处理数据
   */
  nuxtServerInit(context: ActionContext<S, R>, server: NuxtServerContext): Promise<void>
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit ({ commit }, { req }) {
    let { getAuthInfo } = req.$__payload ?? req
    let jwtoken = getCookie('jwtoken', req.headers.cookie)
    if (!isFunction(getAuthInfo)) return
    try {
      let authInfo = await getAuthInfo(jwtoken)
      commit(Types.auth.SETAUTH, authInfo?.user)
    } catch (error) {
      console.error((<Error>error).message)
    }
    
  }
}

/**
 * 获取 cookie 值
 * @param name 
 * @param cookie 
 * @returns 
 */
function getCookie (name: string, cookie?: string) {
  return get(fromPairs(compact((cookie ?? '').split(/\;/))
      .map(String)
      .map(trim)
      .map( s => s.split(/\=/) )), name)
}