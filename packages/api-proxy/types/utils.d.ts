import { Context } from '@kenote/core'
import { APIProxy } from './api-proxy'

/**
 * 解析 PlainObject 中的字符串
 * @param value 
 * @param parse 
 * @returns 
 */
export declare function parsePlainObject(value: any): () => any
export declare function parsePlainObject(value: any, parse: APIProxy.ParseOptions): () => any
export declare function parsePlainObject(value: any): (customize: Record<string, Function>) => any
export declare function parsePlainObject(value: any, parse: APIProxy.ParseOptions): (customize: Record<string, Function>) => any


/**
 * 运行指定内部服务
 * @param name 
 * @param args 
 * @returns 
 */
export declare function runService(name: string): <T = Record<string, any>>(service: T) => Promise<any>
export declare function runService(name: string, args: any[]): <T = Record<string, any>>(service: T) => Promise<any>
export declare function runService(name: string): <T = Record<string, any>>(service: T, ctx: Context) => Promise<any>
export declare function runService(name: string, args: any[]): <T = Record<string, any>>(service: T, ctx: Context) => Promise<any>

/**
 * 获取 Header 相关值
 * @param name 
 * @returns 
 */
export declare function getHeader(name: string): (header: string[]) => string | undefined

/**
 * 获取 Service 模块
 * @param options 
 * @returns 
 */
export declare function getServiceModules(options: APIProxy.ModuleOptions): Promise<Record<string, any>>