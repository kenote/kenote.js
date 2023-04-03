import type { IncomingHttpHeaders } from 'http'
import type { Method } from '@kenote/common'

/**
 * HTTP 请求
 */
export declare interface HttpRequest {
  /**
   * 请求方式
   */
  method       : Method
  /**
   * URL地址
   */
  url          : string
  /**
   * Headers 信息
   */
  headers     ?: IncomingHttpHeaders
  /**
   * URL 参数
   */
  params      ?: NodeJS.Dict<any>
  /**
   * POST 参数
   */
  body        ?: NodeJS.Dict<any>
}

/**
 * HTTP 响应
 */
export declare interface HttpResponse {
  body        ?: Buffer | string | null
  headers     ?: string[]
  status      ?: string
}

/**
 * 将请求转换为命令行
 * @param request 
 * @returns 
 */
export declare function fetchToShell (request: HttpRequest): string

/**
 * 发送 Curl 请求
 * @param request 
 * @returns 
 */
export declare function shellAsCurl (request: HttpRequest): Promise<HttpResponse>