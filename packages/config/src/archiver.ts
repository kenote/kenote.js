import archiver from 'archiver'
import unzipper from 'unzipper'
import glob from 'glob'
import { merge } from 'lodash'
import fs from 'fs'
import isStream from 'is-stream'
import { ZipOptions, UnzipOptions } from '../types/archiver'

/**
 * 默认压缩配置
 */
export const defaultZipOptions: ZipOptions = {
  format: 'tar',
  level: 9,
  append: []
}

/**
 * 压缩文件
 * @param file 
 * @param patterns 
 * @param globOptions 
 * @param zipOptions 
 * @returns 
 */
export function zip (file: string, patterns: string[], globOptions: glob.IOptions, zipOptions?: ZipOptions) {
  let { format, level, append, ondata } = merge(defaultZipOptions, zipOptions)
  let options: archiver.ArchiverOptions = format === 'zip' ? {
    zlib: { level }
  } : {
    gzip: true,
    gzipOptions: { level }
  }
  return new Promise((resolve, reject) => {
    let archive = archiver(format!, options)
    let output = fs.createWriteStream(file)
    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes')
      console.log('archiver has been finalized and the output file descriptor has closed.')
    })
    output.on('end', () => {
      console.log('Data has been drained')
    })
    archive.on('warning', err => {
      if (err.code === 'ENOENT') {
        // log warning
        console.warn(err.message)
      } else {
        reject(err)
      }
    })
    archive.on('error', err => {
      reject(err)
    })
    archive.on('data', data => ondata)
    archive.on('end', () => {
      let archiveSize = archive.pointer()
      resolve(archiveSize)
    })
    archive.pipe(output)
    for (let pattern of patterns) {
      archive.glob(pattern, globOptions)
    }
    for (let item of append ?? []) {
      let [ source, target ] = item
      archive.directory(source, target)
    }
    archive.finalize()
  })
}

/**
 * 解压文件
 * @param zipfile 
 * @param rootDir 
 * @param options 
 */
export async function unzip (zipfile: fs.ReadStream | string, rootDir: string, options?: UnzipOptions) {
  let stream: fs.ReadStream
  if (isStream(zipfile)) {
    stream = zipfile as fs.ReadStream
  }
  else {
    stream = fs.createReadStream(<string>zipfile)
  }
  await stream.pipe(unzipper.Extract({ path: rootDir }))
    .on('data', chunk => options?.ondata)
    .promise()
}