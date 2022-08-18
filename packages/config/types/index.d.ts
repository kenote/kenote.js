import glob from 'glob'

export { readCode } from './escode'
export * from './archiver'

export declare interface LoadConfigOptions {
  /**
   * 设置根目录
   */
  root         ?: string
  /**
   * 合并类型   object | array
   */
  type         ?: 'object' | 'array'
  /**
   * 合并模式   assign | merge
   */
  mode         ?: 'assign' | 'merge'
  /**
   * 排除规则
   */
  filter       ?: (value: string, index: number) => boolean
  /**
   * 变量替换
   */
  assign       ?: object
}

/**
 * 配置文件排序；将 *.default.(json|yaml|yml) 排到最前面, 将 *.release.(json|yaml|yml) 排到最后面
 * @param files 
 */
export declare function dataFileSort (files: string[]): string[]

/**
 * 
 * @param name 
 * @param options 
 */
export declare function loadConfig<T> (name: string): T
export declare function loadConfig<T> (name: string, options: LoadConfigOptions): T

/**
 * 异步导入JS
 * @param filename 
 * @param ctx
 */
export declare function asyncRequire (filename: string): any
export declare function asyncRequire (filename: string, ctx: NodeJS.Dict<any>): any

/**
 * 回掉函数
 */
export declare type CallbackWithResult<TResult> = (err: Error | null, result?: TResult) => void

/**
 * 获取工作目录经过筛选的所有文件
 * @param patterns 
 * @param options 
 * @param done 
 */
export declare function pickFilsCallback (patterns: string[], options: glob.IOptions, done: CallbackWithResult<string[]>): void

/**
 * 获取工作目录经过筛选的所有文件
 * @param patterns string[]
 * @param options glob.IOptions
 * @returns string[]
 */
 export declare function pickFilesPromise (patterns: string[], options: glob.IOptions): Promise<string[] | undefined>

 /**
 * 判断字符串是否 JSON 格式
 * @param str 
 * @returns 
 */
export function isJson (str: string): boolean

/**
 * 判断字符串是否 YAML 格式
 * @param str 
 * @returns 
 */
export function isYaml (str: string): boolean