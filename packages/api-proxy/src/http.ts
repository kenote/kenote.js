import { Method } from '@kenote/common'
import { IncomingHttpHeaders } from 'http'
import { compact, get, merge } from 'lodash'
import qs from 'query-string'
import runscript from 'runscript'
import { HttpRequest, HttpResponse } from '../types/http'

/**
 * 发送 Curl 请求
 * @param request 
 * @returns 
 */
export async function shellAsCurl (request: HttpRequest) {
  let shell = fetchToShell(request)
  let [ status, headers ] = await getResponseHeaders(shell)
  let result = await runscript(`${shell}`, { stdio: 'pipe' })
  let response: HttpResponse = {
    body: result.stdout,
    headers: headers as string[],
    status: status as string
  }
  return response
}

/**
 * 获取返回的 Header 信息
 * @param shell 
 * @returns 
 */
async function getResponseHeaders (shell: string) {
  let result = await runscript(`${shell} -I`, { stdio: 'pipe' })
  let [ tunnel, status, ...info ] = compact(result.stdout?.toString()?.split(/\r\n/))
  return [ status, info.slice(0, info.length -1) ]
}

/**
 * 将请求转换为命令行
 * @param request 
 * @returns 
 */
export function fetchToShell (request: HttpRequest) {
  let { method, params, body, headers } = request
  let shell = 'curl'
  let Imethod = toMethodShell(method)
  let { url, query } = qs.parseUrl(request.url)
  let Iurl = qs.stringifyUrl({ url, query: merge(query, params) })
  let data = ''
  if (body && (method ?? 'GET').toLowerCase() != 'get') {
    let contentType = Object.keys(headers ?? {}).find( r => r.toLowerCase() === 'content-type' )
    if (get(headers, contentType!) === 'application/json') {
      data = `-d '${JSON.stringify(body)}'`
    }
    else {
      data = `-d '${qs.stringify(body)}'`
    }
  }
  let Iheaders = toHeaderShell(headers)
  return compact([ shell, data, Imethod, Iurl, Iheaders ]).join(' ')
}

/**
 * 转换 Method
 * @param value 
 */
function toMethodShell (value: Method) {
  let method = value.toUpperCase()
  return method === 'GET' ? '' : `-X ${method}`
}

/**
 * 转换 Headers
 * @param value 
 */
function toHeaderShell (value?: IncomingHttpHeaders) {
  if (!value) return ''
  let shell: string[] = []
  for (let [key, val] of Object.entries(value)) {
    shell.push(`-H "${key}: ${val}"`)
  }
  return shell.join(' ')
}