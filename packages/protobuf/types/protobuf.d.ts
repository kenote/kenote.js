import protobuf from 'protobufjs'
import zlib from 'zlib'

export declare namespace Protobuf {

  /**
   * 配置选项
   */
  interface Configure {
    /**
     * 路径
     */
    path          : string
    /**
     * 入口文件
     */
    socket        : string
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
    /**
     * 生成 TS 类型文件
     */
    tsOptions    ?: {
      // 输出路径
      output     ?: string
    }
  }

  /**
   * 节点选项
   */
  interface NodeOptions {
    /**
     * 文件名称
     */
    file          : string
    /**
     * 包头名称
     */
    package       : string
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
    zlibOptions  ?: zlib.ZlibOptions
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
    /**
     * 压缩选项
     */
    zlibOptions  ?: zlib.ZlibOptions
  }

  /**
   * Protobuf 信息
   */
  interface INamespace {
    filename        ?: string
    /**
     * package 名称
     */
    packageName      : string
    /**
     * 消息类型
     */
    messages         : Record<string, protobuf.IType> 
    /**
     * 枚举类型
     */
    enums            : Record<string, protobuf.IEnum>
    /**
     * 定义服务
     */
    services          : Record<string, protobuf.IService>
  }
}

export declare class Protobuf {

  constructor (options: Protobuf.Configure)

  /**
   * 对发送数据进行编码
   * @param msgtype 
   * @param csMsg 
   * @param params 
   * @returns 
   */
  public encode<T = Record<string, any>> (msgtype: number, params: Partial<T>): Buffer
  public encode<T = Record<string, any>> (msgtype: number, params: Partial<T>, requestType: string): Buffer

  /**
   * 对返回数据进行解码
   * @param buffer 
   * @param responseType 
   * @returns 
   */
  public decode<T = unknown> (buffer: zlib.InputType): T
  public decode<T = unknown> (buffer: zlib.InputType, decodeOptions: Protobuf.DecodeOptions): T

  /**
   * 获取消息类型
   * @param name 
   * @returns 
   */
  public getMessageType (name: string): protobuf.Type

  /**
   * 获取枚举类型
   * @param name 
   * @returns 
   */
  public getEnumType (name: string): protobuf.Enum

  /**
   * 获取定制服务
   * @param name 
   * @returns 
   */
  public getService (name: string): protobuf.Service

  /**
   * 将 Protobuf 文件转换为命名对象
   * @param filename 
   * @returns 
   */
  public toObject (filename?: string): Protobuf.INamespace

  /**
   * 加载 Protobuf
   * @param filename 
   * @returns 
   */
  public loadSync (filename: string): protobuf.Root

  /**
   * 生成 TS 类型文件
   */
  public generateTypes (): Promise<void>
  public generateTypes (name: string): Promise<void>
}

/**
 * 打包数据
 * @param buffer 
 * @returns 
 */
export declare function makeData (buffer: zlib.InputType): Buffer
export declare function makeData (buffer: zlib.InputType, options: zlib.ZlibOptions): Buffer