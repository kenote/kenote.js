
import ruleJudgment from 'rule-judgment'
import { CommonDataNode, FilterQuery } from '../types'
import { cloneDeep, remove, isEqual, merge, isArray, isEmpty, unset, pick } from 'lodash'

/**
 * 数据节点代理
 */
export class DataNodeProxy<T extends CommonDataNode> {

  private __data: T[]

  constructor (data: T[]) {
    this.__data = cloneDeep(data)
  }

  get data () {
    return this.__data
  }

  /**
   * 查找节点
   * @param query 
   * @param data 
   */
  public find (query?: FilterQuery<T> | null, data: T[] = this.__data): T | undefined {
    let __data: T | undefined
    for (let item of data) {
      if (!isEmpty(query) && ruleJudgment({ ...query })(item)) {
        __data = item
        return __data
      }
      else if (item.children) {
        __data = this.find(query, item.children)
        if (__data) return __data
      }
    }
    return __data
  }

  /**
   * 添加节点
   * @param key 
   * @param item 
   * @param data 
   */
  public add (key: string | null, items: T | T[], data: T[] = this.__data) {
    let __items = isArray(items) ? items : [ items ]
    if (!key) {
      data.push(...__items)
      return
    }
    let __data = this.find({ key } as FilterQuery<T>, data)
    if (__data) {
      if (!__data.children) {
        __data.children = []
      }
      __data.children?.push(...__items)
    }
  }

  /**
   * 移除节点
   * @param key 
   * @param data 
   */
  public remove (key: string, data: T[] = this.__data) {
    let __data: T[] = data
    for (let item of __data) {
      if (item.key === key) {
        remove(__data, o => o.key === key)
        return __data
      }
      else if (item.children) {
        let __children = this.remove(key, item.children)
        if (!isEqual(__children, item.children)) return __data
      }
    }
    return __data
  }

  /**
   * 更新节点
   * @param key 
   * @param payload 
   * @param data 
   */
  public update (key: string, payload: Partial<T>, data: T[] = this.__data) {
    let __data: T[] = data
    let i = 0
    for (let item of __data) {
      if (item.key === key) {
        __data[i] = merge(item, payload)
        return __data
      }
      else if (item.children) {
        let children = cloneDeep(item.children)
        let __children = this.update(key, payload, item.children)
        if (!isEqual(__children, children)) return __data
      }
      i++
    }
    return __data
  }
}

/**
 * 数据节点代理
 * @param data 
 */
export const dataNodeProxy = <T extends CommonDataNode>(data: T[]) => new DataNodeProxy<T>(data)

/**
 * 初始化 Maps
 * @param data 
 * @param maps 
 */
export function initMaps<T extends CommonDataNode> (data: T[], maps: Array<Pick<T, 'key' | 'name'>> = []) {
  // let __data = (data)
  data.forEach( (item, __v) => {
    item.maps = [ ...maps ]
    item.maps.push(pick(item, ['key', 'name']) as T)
    if (item.children) {
      return initMaps(item.children, item.maps)
    }
  })
  return data
}

/**
 * 移除数据 Maps
 * @param data 
 */
export function removeMaps<T extends CommonDataNode> (data: T[]) {
  // let __data = cloneDeep(data)
  data.forEach( (item, __v) => {
    unset(item, 'maps')
    if (item.children) {
      return removeMaps(item.children)
    }
  })
  return data
}