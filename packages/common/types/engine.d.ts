import { IncomingHttpHeaders } from 'http'

export { CommonEngine } from '../src/engine'

export declare namespace CommonEngineOptions {

  interface StaticDir<T = any> {
    /**
     * 物理路径
     */
    rootDir       : string
    /**
     * 指向路径
     */
    rootPath     ?: string
    /**
     * 参数选项
     */
    options      ?: T
  }

  interface Template {
    /**
     * 模版物理路径
     */
    viewDir       : string
    /**
     * 模版引擎
     */
    engine       ?: string
    /**
     * 扩展名
     */
    extension     : string
  }

  /**
   * 中间件选项
   */
  interface RequestOptions<T = object> {
    /**
     * Cors 跨域选项
     */
    cors         ?: T | true
    /**
     * 设置 Headers
     */
    headers      ?: IncomingHttpHeaders
  }
}