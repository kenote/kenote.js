import { ModuleTree } from 'vuex'
import { namespace } from 'nuxt-property-decorator'
import { cloneDeep } from 'lodash'
import * as root from './root'
import * as auth from './modules/auth'

interface ModulesStates extends Record<string, any> {}

export const strict = false

export type RootState = root.State & ModulesStates

export const Store = {
  Auth     : namespace(auth.name),
}

export const modules: ModuleTree<ModulesStates> = {
  [auth.name]       : auth,
}

export const state = () => root.state()

export const getters = root.getters

export const mutations = root.mutations

export const actions = root.actions

export const Types = {
  auth     : getStoreTypes<typeof auth.types>(auth),
}

/**
 * 获取相关 Mutation 事件类型
 * @param store 
 * @returns 
 */
function getStoreTypes <T extends {}>(store: { name: string, types: Readonly<T> }) {
  let prefix = store.name
  let types = cloneDeep(store.types)
  for (let [key, value] of Object.entries(types)) {
    types[key] = [ prefix, value ].join('/')
  }
  return types
}