import { TcpSocketConnectOpts } from 'net'
import { Protobuf } from './protobuf'

export declare namespace TCPSocket {

  type Configure<T = { protobuf?: Protobuf.Configure }>  = {
    logger   ?: Logger
  } & TcpSocketConnectOpts & T

  interface Logger {
    info (message: any, ...args: any[]): void
    error (message: any, ...args: any[]): void
  }
}

export declare class TCPSocket {

  constructor (options: TCPSocket.Configure)

  /**
   * 连接服务器
   * @returns 
   */
  connect (): this
  connect (options: TcpSocketConnectOpts): this

  /**
   * 关闭/销毁客户端连接
   * @param error 
   */
  destroy (): void

  /**
   * 发送消息
   * @param data 
   * @returns 
   */
  send (): this
  send (data: Uint8Array | string): this

  /**
   * 发送消息, 直接返回结果
   * @param promise 
   * @returns 
   */
  send<T = unknown> (promise: true): Promise<T>

  /**
   * 监听事件
   * @param event 
   * @param listener 
   * @returns 
   */
  on (event: 'data', listener: (data: Buffer) => void): void
  on (event: 'error', listener: (error: Error) => void): void
  on (event: 'timeout', listener: () => void): void
  on (event: 'close', listener: (had_error: boolean) => void): void
  on (event: string, listener: (...args: any[]) => void): void

  /**
   * 监听事件(仅一次)
   * @param event 
   * @param listener 
   * @returns 
   */
  once (event: 'data', listener: (data: Buffer) => void): void
  once (event: 'error', listener: (error: Error) => void): void
  once (event: 'timeout', listener: () => void): void
  once (event: 'close', listener: (had_error: boolean) => void): void
  once (event: string, listener: (...args: any[]) => void): void

  /**
   * 立即返回结果
   * @returns 
   */
  exec<T = unknown> (): Promise<T>

  /**
   * 编码数据
   * @param msgtype 
   * @param params 
   * @param requestType 
   * @returns 
   */
  encode<T = Record<string, any>> (msgtype: number, params: Partial<T>): this
  encode<T = Record<string, any>> (msgtype: number, params: Partial<T>, requestType: string): this
}
