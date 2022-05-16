import { TCPSocket } from '@kenote/protobuf'
import { Socket } from '../types/socket'
import ruleJudgment from 'rule-judgment'
import { first, toPlainObject } from 'lodash'

/**
 * 发送 Socket 请求
 * @param msgtype 
 * @param payload 
 * @param requestType 
 * @returns 
 */
export function socketRequest<T> (msgtype: number, payload: Record<string, any>, requestType?: string) {
  return async (options: Socket.Configure) => {
    let { tcpSocket, server, tag } = options
    let client = new TCPSocket(tcpSocket)
    if (tag) {
      let connect = server.find( ruleJudgment({ key: tag }) )
      if (connect) {
        client.connect(connect)
      }
    }
    else if (!tcpSocket.host) {
      let connect = first(server)
      if (connect) {
        client.connect(connect)
      }
    }
    tcpSocket.logger?.info(payload)
    try {
      let result = await client.encode(msgtype, payload, requestType!).send<T>(true)
      tcpSocket.logger?.info(result)
      return toPlainObject(result)
    } catch (error) {
      tcpSocket.logger?.error(error?.message)
    }
  }
}