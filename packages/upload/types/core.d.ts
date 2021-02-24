import { IncomingMessage } from 'http'
import { UploadStoreOptions, PutStreamFunction, ErrorInfo, PutResult } from '.'

/**
 * 上传存储器
 */
export declare class UploadStore {

  constructor  (options: UploadStoreOptions, req: IncomingMessage)

  /**
   * 获取类型
   */
  type: string

  /**
   * 上传文件
   * @param putStream 
   * @param dir 
   * @param errInfo 
   */
  public upload (putStream: PutStreamFunction, errInfo: ErrorInfo): Promise<PutResult[]>
  public upload (putStream: PutStreamFunction, errInfo: ErrorInfo, dir: string): Promise<PutResult[]>
}

/**
 * 上传存储器
 * @param options 
 * @param req 
 */
export declare function uploadStore (options: UploadStoreOptions, req: IncomingMessage): UploadStore