
export { UploadStore, uploadStore } from './core'
export { putStream } from './local'

/**
 * 存储器选项
 */
export declare type UploadStoreOptions<T extends {} = {}, U extends {} = {}> = {
  /**
   * 类型
   */
  type           ?: string
  /**
   * 最大上传文件大小
   */
  max_limit       : string
  /**
   * 支持文件类型
   */
  mime_types     ?: string[]
  /**
   * 主目录
   */
  root_dir       ?: string
  /**
   * URL入口
   */
  urlprefix       : string
  /**
   * 使用源文件名称
   */
  original_name  ?: boolean
  /**
   * 错误号
   */
  errors         ?: Record<'limit' | 'mimetype', number>
  /**
   * OSS 选项
   */
  ossOptions     ?: U
} & T

/**
 * 写入流选项
 */
export declare interface PutStreamOptions<T extends {} = {}> {
  /**
   * 文件名
   */
  name           : string
  /**
   * URL入口
   */
  urlprefix      : string
  /**
   * 主目录
   */
  root_dir      ?: string
  /**
   * OSS 选项
   */
  ossOptions    ?: T
}

/**
 * 写入流函数
 */
export declare type PutStreamFunction = (stream: NodeJS.ReadableStream, options: PutStreamOptions, done: NextPutResult) => void

/**
 * 错误信息函数
 */
export declare type ErrorInfo<T = any> = (code: number, opts: string[]) => T

/**
 * 上传回调
 */
export declare type NextResult = (err: number | null, doc: Array<string | PutResult>) => void

/**
 * 写入回调
 */
export declare type NextPutResult = (err: number | null, doc: PutResult | string[]) => void

/**
 * 回调结果
 */
export declare interface PutResult {
  /**
   * 文件名
   */
  name       : string
  /**
   * URL 地址
   */
  url        : string
  /**
   * 文件大小
   */
  size       : number
}