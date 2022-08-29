import { Context } from '@kenote/core'
import { parseBody, parseData, toValue } from 'parse-string'
import { get, isPlainObject, isArray, isString } from 'lodash'
import type { APIProxy } from '../../types'
import { isJson } from '@kenote/config'

export { getServiceModules } from './service'

/**
 * 解析 PlainObject 中的字符串
 * @param value 
 * @param parse 
 * @returns 
 */
export function parsePlainObject (value: any, parse?: APIProxy.ParseOptions) {
  return (customize?: Record<string, Function>) => {
    let isJsonText = false
    if (isString(value) && isJson(value)) {
      value = JSON.parse(value)
      isJsonText = true
    }
    if (isPlainObject(value)) {
      value = get(value, parse?.path ?? '', value)
    }
    if (isArray(parse?.options)) {
      value = parseBody(parse?.options ?? [], customize ?? {})(value)
    }
    else if (parse?.options) {
      value = parseData(parse.options, customize ?? {})(isString(value) ? value : toValue('string')(value))
    }
    if (parse?.exec) {
      value = get(customize, parse.exec)?.(value)
    }
    return isJsonText ? JSON.stringify(value, null, 2) : value
  }
}

/**
 * 运行指定内部服务
 * @param name 
 * @param args 
 * @returns 
 */
export function runService (name: string, args: any[] = []) {
  return async <T = Record<string, any>> (service: T, ctx?: any) => {
    if (!get(service, name)) {
      return null
    }
    ctx && args.splice(0, 0, ctx)
    return get(service, name)?.(...args)
  }
}

/**
 * 获取 Header 相关值
 * @param name 
 * @returns 
 */
export function getHeader (name: string) {
  return (header: string[]) => {
    for (let item of header) {
      let [key, val] = item.split(/\:/)
      if (key.toLocaleLowerCase() === name.toLocaleLowerCase()) {
        return val
      }
    }
  }
}
