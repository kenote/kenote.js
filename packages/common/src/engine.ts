import { CommonEngineOptions } from '..'

export abstract class CommonEngine<T = any> {

  protected __application: T

  /**
   * 获取名称
   */
  get name (): string {
    return ''
  }

  /**
   * 获取 app
   */
  get app (): T {
    return this.__application
  }

  /**
   * 设置静态目录
   */
  set staticDir (value: CommonEngineOptions.StaticDir) {}

  /**
   * 设置模版
   */
  set template (value: CommonEngineOptions.Template) {}

  /**
   * 注册中间件
   * @param handlers 
   */
  register (...handlers: Array<Function | Object>) {
    return (path?: string, options?: CommonEngineOptions.RequestOptions) => {}
  }

}