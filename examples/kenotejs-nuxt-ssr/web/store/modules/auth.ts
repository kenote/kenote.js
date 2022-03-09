import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../'
import type { User } from '@/src/entities'

/**
 * 定义 Module 名称
 */
export const name = 'auth'

/**
 * 定义 Module 使用命名空间
 */
export const namespaced: boolean = true

/**
 * 定义 Mutation 事件类型
 */
export const types = {
  SETAUTH          : 'SETAUTH'
}

/**
 * 定义 State
 */
export interface State {
  auth        ?: User | null
}

/**
 * 设置 State 默认值
 * @returns 
 */
export const state: () => State = () => ({
  auth         : null
})

/**
 * 定义 Getter
 */
export const getters: GetterTree<State, RootState> = {
  /**
   * 获取 username 
   */
  username: state => state.auth?.username,
  /**
   * 获取 authorization
   */
  jwtoken: state => state.auth?.jwtoken
}

/**
 * 定义 Action 类型
 */
export interface Actions<S, R> extends ActionTree<S, R> {
  
}

/**
 * 定义 Action 方法
 */
export const actions: Actions<State, RootState> = {
  
}

/**
 * 定义 Mutation
 */
export const mutations: MutationTree<State> = {
  [types.SETAUTH] (state, user?: User | null) {
    state.auth = user
  }
}