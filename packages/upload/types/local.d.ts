import { PutStreamOptions, NextPutResult } from '.'

/**
 * 将文件流写入物理路径
 * @param stream 
 * @param options 
 * @param done 
 */
export declare function putStream (stream: NodeJS.ReadableStream, options: PutStreamOptions, done: NextPutResult): void