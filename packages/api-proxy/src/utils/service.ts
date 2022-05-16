import path from 'path'
import { camelCase, merge } from 'lodash'
import { asyncRequire, pickFilesPromise } from '@kenote/config'
import type { APIProxy } from '../../types'

/**
 * 定义沙盒基础对象
 */
const sandboxBasicContext: Record<string, NodeModule | NodeRequire | Record<string, any>> = {
  module,
  require,
  console,
  process
}

/**
 * 获取 Npm 模块
 * @param moduleName 
 * @returns 
 */
function getNpmModule (moduleName: string) {
  try {
    return require(moduleName)
  } catch (error) {
    return null
  }
}


/**
 * 获取 Service 模块
 * @param options 
 * @returns 
 */
export async function getServiceModules (options: APIProxy.ModuleOptions) {
  let { alias, cwd, sandbox } = options
  let basicModules = getAliasModule(alias ?? {}, sandbox)
  let customModules = await getCustomModules(cwd, basicModules)
  return merge(basicModules, customModules)
}

/**
 * 获取别名模块
 * @param alias 
 * @param sandbox 
 * @returns 
 */
function getAliasModule (alias: Record<string, string>, sandbox: Record<string, any> = {}) {
  let services: Record<string, any> = sandbox
  for (let [key, val] of Object.entries(alias)) {
    services[key] = getNpmModule(val)
  }
  return services
}

/**
 * 获取自定义模块
 * @param cwd 
 * @param sandboxContext 
 * @returns 
 */
async function getCustomModules (cwd: string | undefined, sandboxContext?: Record<string, any>) {
  let services: Record<string, any> = {}
  let files = await pickFilesPromise(['.**/**', '**'], { cwd, nodir: true, realpath: true, ignore: ['!**/*.js'] })
  for (let file of files ?? []) {
    services[camelCaseName(file, cwd)] = asyncRequire(file, merge(sandboxBasicContext, sandboxContext))
  }
  return services
}

/**
 * 获取文件的驼峰命名
 * @param file 
 * @param cwd 
 * @returns 
 */
function camelCaseName (file: string, cwd: string = process.cwd()) {
  let extname = path.extname(file)
  let filename = file.replace(new RegExp(`^${cwd}`), '').replace(new RegExp(`\\${extname}$`), '')
  return camelCase(filename)
}
