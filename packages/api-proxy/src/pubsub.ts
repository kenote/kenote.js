import IORedis from 'ioredis'
import jsYaml from 'js-yaml'
import { isBuffer, isArray } from 'lodash'

/**
 * 订阅发布器
 */
export default class Pubsub {

  private static instance: Pubsub
  /**
   * 定义发布器
   */
  private __pub: IORedis.Redis
  /**
   * 定义订阅器
   */
  private __sub: IORedis.Redis

  constructor (options?: IORedis.RedisOptions) {
    this.__pub = new IORedis(options)
    this.__sub = new IORedis(options)
  }

  /**
   * 发布消息
   * @param message 
   * @param data 
   * @returns 
   */
  publish (message: string, data: any) {
    if (isBuffer(data)) {
      return this.__pub.publishBuffer(message, data)
    }
    return this.__pub.publish(message, jsYaml.dump(data))
  }

  /**
   * 订阅消息
   * @param message 
   * @param next 
   * @returns 
   */
  subscribe (message: string | string[], next: (message: string, data: any) => void) {
    this.__sub.on('message', (name: string, data: any) => {
      if (isBuffer(data)) {
        return next(name, data)
      }
      return next(name, jsYaml.load(data))
    })
    let args = isArray(message) ? message : [ message ]
    return this.__sub.subscribe(...args)
  }

  /**
   * 订阅消息
   * @param message 通过正则匹配
   * @param next 
   * @returns 
   */
  psubscribe (message: string | string[], next: (message: string, data: any) => void) {
    this.__sub.on('pmessage', (pattern: string, name: string, data: any) => {
      if (isBuffer(data)) {
        return next(name, data)
      }
      return next(name, jsYaml.load(data))
    })
    let args = isArray(message) ? message : [ message ]
    return this.__sub.psubscribe(...args)
  }

  public static getInstance(options?: IORedis.RedisOptions) {
    if (!Pubsub.instance) {
      Pubsub.instance = new Pubsub(options)
    }
    return Pubsub.instance
  }
}