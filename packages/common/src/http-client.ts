import qs from 'query-string'
import urlParse from 'url-parse'
import { fromPairs, compact, trim, get } from 'lodash'
import { IncomingHttpHeaders } from 'http'
import { HeaderOptions, RequestConfig, ProgressResult, HttpResponse, ClientInstance, Method } from '../types'

function setHeader<T extends HeaderOptions> (options?: T) {
  let headers = options?.headers ?? {}
  if (options?.token) {
    headers.authorization = ['Bearer', options.token].join(' ')
  }
  return headers
}

function onProgress (next: ProgressResult, total?: number) {
  return (progressEvent: ProgressEvent) => {
    let __total = total ?? progressEvent.total
    let percentage = Math.round((progressEvent.loaded * 100) / __total)
    if (percentage <= 100) {
      next({
        percentage,
        total: __total,
        size: progressEvent.loaded
      })
    } 
  }
}

function getResponseData<T = any> (options: RequestConfig, next?: (response: HttpResponse<T>) => void) {
  return async (client: ClientInstance) => {
    let response = await client(options)
    next && next(response)
    if (!response) return null
    if (response.status >= 200 && response.status < 300) {
      return response.data as T
    }
    throw new Error(response.statusText)
  }
}

export function sendData<T = any> (method: Method, url: string, data: any) {
  return (client: ClientInstance, options?: HeaderOptions) => {
    let config: RequestConfig = {
      method,
      url,
      headers: setHeader(options),
      timeout: options?.timeout,
      ...options?.config
    }
    if (options?.download) {
      config.responseType = options.responseType ?? 'blob'
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.onDownloadProgress = onProgress(options.download, options.total)
    }
    if (options?.upload) {
      config.method = 'post'
      config.headers['Content-Type'] = 'multipart/form-data'
      config.onUploadProgress = onProgress(options.upload, options.total)
    }
    if (method.toLocaleLowerCase() === 'get') {
      let { query, origin, pathname } = urlParse(url)
      config.params = { ...qs.parse(query as unknown as string), ...data }
      config.url = origin + pathname
    }
    else {
      config.data = data
    }
    return getResponseData<T>(config, options?.success)(client)
  }
}

export class HttpClient {

  private __client!: ClientInstance
  private __options!: HeaderOptions

  constructor (client: ClientInstance, options?: HeaderOptions) {
    this.__client = client
    this.__options = options ?? {}
  }


  get = <T = any>(url: string, data?: any) => sendData<T>('GET', url, data)(this.__client, this.__options)
  GET = this.get

  post = <T = any>(url: string, data?: any) => sendData<T>('POST', url, data)(this.__client, this.__options)
  POST = this.post

  put = <T = any>(url: string, data?: any) => sendData<T>('PUT', url, data)(this.__client, this.__options)
  PUT = this.put

  delete = <T = any>(url: string, data?: any) => sendData<T>('DELETE', url, data)(this.__client, this.__options)
  DELETE = this.delete

  download = <T = any>(url: string) => sendData<T>('GET', url, null)(this.__client, { download: info => null, ...this.__options })
  DOWNLOAD = this.download

  upload = <T = any>(url: string, data: any) => sendData<T>('POST', url, data)(this.__client, { upload: info => null, ...this.__options })
  UPLOAD = this.upload
}

export function xhrClient (xhr: XMLHttpRequest) {
  return (config: RequestConfig): Promise<HttpResponse> => new Promise((resolve, reject) => {
    let { method, url, timeout, data, params, onDownloadProgress, onUploadProgress, headers, responseType, timeoutErrorMessage } = config
    let __url = method!.toLocaleLowerCase() === 'get' ? qs.stringifyUrl({ url: url ?? '', query: params }) : (url ?? '')
    xhr.open(method ?? 'get', __url, true)
    xhr.timeout = timeout ?? 0
    let __data = data
    if (!get(headers, 'content-type') && ['post', 'put'].includes(method!.toLowerCase())) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
      __data = qs.stringify(data)
    }
    if (headers) {
      for (let [key, val] of Object.entries(headers)) {
        xhr.setRequestHeader(key, val as string)
      }
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      let headers = fromPairs(compact(xhr.getAllResponseHeaders().split(/\r|\n/)).map( r => r.split(/\:/).map(trim) )) as IncomingHttpHeaders
      let response: HttpResponse = {
        data: xhr.response,
        status: xhr.status,
        statusText: xhr.statusText,
        headers
      }
      if (['arraybuffer', 'blob'].includes(responseType ?? '')) {
        response.data = new Blob([xhr.response], { type: xhr.getResponseHeader('content-type')! })
      }
      else if (/^(application\/json)/.test(headers['content-type'] ?? '')) {
        response.data = JSON.parse(xhr.response ?? '')
      }
      resolve(response)
    }

    if (onDownloadProgress) {
      xhr.onprogress = onDownloadProgress
    }
    if (onUploadProgress) {
      xhr.upload.onprogress = onUploadProgress
    }
    xhr.onerror = () => reject('Error') 
    xhr.ontimeout = () => reject(timeoutErrorMessage ?? '网络请求超时！')
    xhr.onabort = () => {}
    xhr.send(__data)
  })
}
