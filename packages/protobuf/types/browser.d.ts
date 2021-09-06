import protobuf from 'protobufjs'
import pako from 'pako'

export declare namespace Browser {

  /**
   * 配置选项
   */
  interface Configure<T> {
    /**
     * 入口
     */
    socket        : T
    /**
     * 编码选项
     */
    encode        : EncodeOptions
    /**
     * 解码选项
     */
    decode        : DecodeOptions
    /**
     * 默认请求消息类型
     */
    requestType   : string
  }

  /**
   * 编码选项
   */
  interface EncodeOptions {
    /**
     * 消息类型名称
     */
    type          : string
    /**
     * 设置字段默认值
     */
    fields       : Record<string, any>
    /**
     * 消息类型编号绑定的字段 Path
     */
    msgtype       : string
    /**
     * 参数值绑定的字段 Path
     */
    payload       : string
    /**
     * 压缩选项
     */
    zlibOptions  ?: pako.DeflateFunctionOptions
  }

  /**
   * 解码选项
   */
  interface DecodeOptions {
    /**
     * 消息类型名称
     */
    type          : string
    /**
     * 设置字段消息类型
     */
    fields        : Record<string, string>
  }

}

export declare class Browser<T> {

  /**
   * 
   * @param options 
   */
  constructor (options: Browser.Configure<T>)

  /**
   * 返回 Protobuf 接口类型 
   */
  get socket (): T

  /**
   * 对发送数据进行编码
   * @param msgtype 
   * @param params 
   * @param requestType 
   */
  public encode<U = Record<string, any>> (msgtype: number, params: Partial<U>): Buffer
  public encode<U = Record<string, any>> (msgtype: number, params: Partial<U>, requestType: string): Buffer

  /**
   * 对返回数据进行解码
   * @param buffer 
   * @param decodeOptions
   */
  public decode<U = unknown> (buffer: Buffer | ArrayBuffer): U
  public decode<U = unknown> (buffer: Buffer | ArrayBuffer, decodeOptions: Browser.DecodeOptions): U

  /**
   * 获取消息类型
   * @param name 
   * @returns 
   */
  public getMessageType (name: string): protobuf.Type
}