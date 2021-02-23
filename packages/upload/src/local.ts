import path from 'path'
import fs from 'fs-extra'
import { last, compact } from 'lodash'
import { PutStreamOptions, NextPutResult } from '../types'

/**
 * 将文件流写入物理路径
 * @param stream 
 * @param options 
 * @param done 
 */
export function putStream (stream: NodeJS.ReadableStream, options: PutStreamOptions, done: NextPutResult) {
  let { name, urlprefix, root_dir } = options
  let filePath = path.resolve(process.cwd(), root_dir ?? '', name)
  let fileDir = path.dirname(filePath)

  let filename = last(name.split('/'))
  let dirname = path.dirname(compact(name.split('/')).join('/'))
  let dir = !/^(\.|\/)$/.test(dirname) ? '?dir=' + dirname : ''

  if (process.env.NODE_ENV !== 'test') {
    !fs.existsSync(fileDir) && fs.mkdirpSync(fileDir)
    stream.pipe(fs.createWriteStream(filePath))
  }
  stream.on('end', () => done(null, {
    name,
    url: urlprefix + '/' + filename + dir,
    size: 0
  }))
}