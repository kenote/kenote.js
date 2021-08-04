import fs from 'fs'
import { readCode } from './escode'

/**
 * 异步导入JS
 * @param filename 
 */
export function asyncRequire (filename: string) {
  let file = require.resolve(filename)
  if (!fs.existsSync(file)) return undefined
  let source = fs.readFileSync(file, 'utf-8')
  return readCode(source)
}