import archiver from 'archiver'
import glob from 'glob'
import fs from 'fs'

export declare interface UnzipOptions {
  ondata?: (data: any) => void
}

export declare interface ZipOptions extends UnzipOptions {
  format ?: archiver.Format
  // levels 1-9
  level  ?: number
  append ?: string[][]
}

/**
 * 压缩文件
 * @param file 
 * @param patterns 
 * @param globOptions 
 * @param zipOptions 
 */
export declare function zip(file: string, patterns: string[], globOptions: glob.IOptions): Promise<number>
export declare function zip(file: string, patterns: string[], globOptions: glob.IOptions, zipOptions: ZipOptions): Promise<number>

/**
 * 解压文件
 * @param zipfile 
 * @param rootDir 
 * @param options 
 */
export declare function unzip(zipfile: string, rootDir: string): Promise<void>
export declare function unzip(zipfile: fs.ReadStream | string, rootDir: string): Promise<void>
export declare function unzip(zipfile: string, rootDir: string, options: UnzipOptions): Promise<void>
export declare function unzip(zipfile: fs.ReadStream | string, rootDir: string, options: UnzipOptions): Promise<void>