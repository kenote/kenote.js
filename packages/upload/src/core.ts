import path from 'path'
import Busboy from 'busboy'
import bytes from 'bytes'
import { UploadStoreOptions, PutStreamFunction, ErrorInfo, NextResult, PutResult } from '../types'
import { IncomingMessage } from 'http'
import crypto from 'crypto'

/**
 * 存储器
 */
export class UploadStore {

  private __Options: UploadStoreOptions

  private __Request: IncomingMessage

  constructor (options: UploadStoreOptions, req: IncomingMessage) {
    this.__Options = options
    this.__Request = req
  }

  /**
   * 上传文件
   * @param putStream 
   * @param dir 
   * @param errInfo 
   */
  public upload (putStream: PutStreamFunction, errInfo: ErrorInfo, dir: string = '') {
    return new Promise((resolve, reject) => {
      this.__upload(putStream, dir, (err, doc) => {
        if (err) {
          reject(errInfo(err, doc as string[]))
        }
        else {
          resolve(doc as PutResult[])
        }
      })
    })
  }

  private __upload (putStream: PutStreamFunction, dir: string = '', done: NextResult) {
    let { max_limit, mime_types, urlprefix, root_dir, original_name, errors } = this.__Options
    let { headers } = this.__Request
    let busboy = new Busboy({
      headers,
      limits: {
        fileSize: bytes(max_limit)
      }
    })

    let files: PutResult[] = []
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      // 获取文件名
      if (!original_name) {
        let extname = path.extname(filename)
        filename = crypto.createHash('md5').update(Date.now().toString()).digest('hex') + extname
      }
      let name = path.join(dir.replace(/^\//, ''), filename)
      // 检查文件类型
      if (mime_types && !mime_types?.includes(mimetype)) {
        return done(errors?.mimetype ?? 302, [ mimetype ])
      }
      // 检查文件大小
      let fileSize = 0
      file.on('data', (data: Buffer) => {
        fileSize += data.length
      })
      file.on('limit', () => {
        return done(errors?.mimetype ?? 301, [max_limit])
      })
      // 保存上传文件
      putStream(file, { name, urlprefix, root_dir }, (err, result) => {
        if (err) {
          return done(err, result as string[])
        }
        else if ('name' in result) {
          files.push({ ...result, size: fileSize })
        }
      })
    })
    busboy.on('finish', () => done(null, files))
    this.__Request.pipe(busboy)
  }
}

/**
 * 上传存储器
 * @param options 
 * @param req 
 */
export const uploadStore = (options: UploadStoreOptions, req: IncomingMessage) => new UploadStore(options, req)