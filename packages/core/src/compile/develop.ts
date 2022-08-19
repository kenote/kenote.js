import path from 'path'
import runScript from 'runscript'
import { merge } from 'lodash'
import type { CompileConfigure } from '../../types/compile'
import { readConfigure, defaultOptions, generateNodemon } from './config'

/**
 * 运行开发模式
 */
export async function runDevelop () {
  let options = readConfigure('kenci.config')
  let config: CompileConfigure = merge(defaultOptions, options?.default ?? options)
  let nodemonConfigFile = generateNodemon(config)
  let entryFile = path.resolve(process.cwd(), config.srcDir, config.entry)
  try {
    await runScript(`nodemon --config ${nodemonConfigFile} ${entryFile}`)
  } catch (error) {
    console.error(error)
  }
  process.exit(0)
}