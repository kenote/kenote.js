import { IncomingHttpHeaders } from 'http'

export declare type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

export declare type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export declare interface ProgressInfo {
  percentage     : number
  total          : number 
  size           : number
}

export declare type ProgressResult = (info: ProgressInfo) => void

export declare interface HeaderOptions<T = {}> {
  token         ?: string
  headers       ?: IncomingHttpHeaders
  responseType  ?: ResponseType
  timeout       ?: number
  upload        ?: ProgressResult
  download      ?: ProgressResult
  success       ?: (response: HttpResponse) => void
  total         ?: number
  config        ?: T
}

export declare interface RequestConfig extends Record<string, any> {
  method              ?: Method
  url                 ?: string
  headers             ?: any
  params              ?: any
  data                ?: any
  responseType        ?: ResponseType
  timeout             ?: number
  timeoutErrorMessage ?: string
  onUploadProgress    ?: (progressEvent: any) => void
  onDownloadProgress  ?: (progressEvent: any) => void
}

export declare interface HttpResponse<T = any> extends Record<string, any> {
  data           : T
  status         : number
  statusText     : string
  headers        : any
}

export declare interface ClientInstance {
  (options: RequestConfig): Promise<HttpResponse>
}

export declare class HttpClient {

  constructor (client: ClientInstance, options?: HeaderOptions)

  get <T = any>(url: string, data?: any): Promise<T | null>
  GET <T = any>(url: string, data?: any): Promise<T | null>

  post <T = any>(url: string, data?: any): Promise<T | null>
  POST <T = any>(url: string, data?: any): Promise<T | null>

  put <T = any>(url: string, data?: any): Promise<T | null>
  PUT <T = any>(url: string, data?: any): Promise<T | null>

  delete <T = any>(url: string, data?: any): Promise<T | null>
  DELETE <T = any>(url: string, data?: any): Promise<T | null>

  download <T = any>(url: string): Promise<T | null>
  DOWNLOAD <T = any>(url: string): Promise<T | null>

  upload <T = any>(url: string, data?: any): Promise<T | null>
  UPLOAD <T = any>(url: string, data?: any): Promise<T | null>
}

export declare function xhrClient (xhr: XMLHttpRequest): (config: RequestConfig) => Promise<HttpResponse>