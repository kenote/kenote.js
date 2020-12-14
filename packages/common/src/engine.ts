export abstract class CommonEngine<T = Object> {

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

}