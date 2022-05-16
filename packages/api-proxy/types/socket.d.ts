import { TcpSocketConnectOpts } from 'net'
import { TCPSocket } from '@kenote/protobuf'

export declare namespace Socket {

  interface Configure {
    /**
     * TCPSocket 配置
     */
    tcpSocket             : TCPSocket.Configure
    /**
    * 服务器列表
    */
    server                : Array<TcpSocketConnectOpts & { key: string }>
    /**
     * 指定服务器
     */
    tag                  ?: string
  }

  interface Request {
    /**
     * 消息号
     */
     msgtype              : number
     /**
      * 请求消息类型
      */
     requestType         ?: string
     /**
      * 返回消息类型
      */
     responseType        ?: string
     /**
      * 指定服务器
      */
     serverTag           ?: string | TCPSocket.Configure
  }
}

/**
 * 发送 Socket 请求
 * @param msgtype 
 * @param payload 
 * @param requestType 
 * @returns 
 */
 export declare function socketRequest<T> (msgtype: number, payload: Record<string, any>, requestType?: string): (options: Socket.Configure) => Promise<T>