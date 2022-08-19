import path from 'path'
import { loadConfig } from '@kenote/config'
import type { CompileConfigure } from '../../types/compile'
import type nodemon from 'nodemon'
import fs from 'fs'
import { merge } from 'lodash'

const developDir = path.resolve(process.cwd(), '.develop')

/**
 * 默认配置
 */
export const defaultOptions: CompileConfigure = {
  entry: 'main.ts',
  srcDir: 'src/',
  tsconfig: 'tsconfig.json',
  build: {
    outDir: 'dist/',
    emptyOutDir: false
  },
  develop: {
    ignore: [ '.git/', 'node_modules/', 'dist/', 'coverage/' ],
    ext: 'js,ts,json',
    port: 4000
  }
}

/**
 * 读取配置文件
 * @param name 
 * @returns 
 */
export function readConfigure (name: string) {
  try {
    return require(path.resolve(process.cwd(), name))
  } catch (error) {
    return loadConfig(`${name}.yml`)
  }
}

/**
 * 生成 nodemon 配置
 * @param config 
 */
export function generateNodemon (config: CompileConfigure) {
  let srcDir = path.resolve(process.cwd(), config.srcDir)
  let tsconfig = path.resolve(srcDir, config.tsconfig)
  let options: nodemon.Settings = {
    restartable: 'rs',
    ignore: config.develop.ignore,
    watch: merge([ srcDir ], config.develop.watch),
    ext: config.develop.ext,
    execMap: {
      ts: 'node -r ts-node/register -r tsconfig-paths/register'
    },
    env: merge({
      NODE_ENV: 'development',
      SERVER_PORT: config.develop.port ?? 4000,
      TS_NODE_PROJECT: tsconfig
    }, config.develop.env)
  }
  !fs.existsSync(developDir) && fs.mkdirSync(developDir, { recursive: true })
  let nodemonConfigFile = path.resolve(developDir, 'nodemon.json')
  fs.writeFileSync(nodemonConfigFile, JSON.stringify(options, null, 2))
  return nodemonConfigFile
}