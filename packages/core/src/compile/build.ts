import path from 'path'
import runScript from 'runscript'
import { merge } from 'lodash'
import type { CompileConfigure } from '../../types/compile'
import { readConfigure, defaultOptions } from './config'

/**
 * 运行编译
 */
export async function runBuild () {
  let options = readConfigure('kenci.config')
  try {
    let config: CompileConfigure = merge(defaultOptions, options?.default ?? options)
    let outDir = path.resolve(process.cwd(), config.build.outDir)
    let srcDir = path.resolve(process.cwd(), config.srcDir)
    let tsconfig = path.resolve(srcDir, config.tsconfig)
    if (config.commands) {
      for (let command of config.commands) {
        await runScript(command)
      }
    }
    if (config.build.emptyOutDir) {
      console.log(`清理编译目录...`)
      await runScript(`rm -rf ${outDir}`)
    }
    console.log(`编译 Ts 到 ${outDir} 目录...`)
    await runScript(`tsc --project ${tsconfig} --outDir ${outDir}`)
    console.log(`转换 tspaths ...`)
    await runScript(`tscpaths -p ${tsconfig} --src ${srcDir} --out ${outDir}`)
    console.log(`编译完成！`)
  } catch (error) {
    console.error(error)
  }
  process.exit(0)
}