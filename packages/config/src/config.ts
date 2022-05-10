import jsYaml from 'js-yaml'
import path from 'path'
import fs from 'fs'
import validator from 'validator'
import { isArray, assign, merge, template } from 'lodash'
import { LoadConfigOptions, CallbackWithResult } from '../types'
import glob from 'glob'
import async from 'async'
import { promisify } from 'util'
import { asyncRequire } from './async-require'

/**
 * 判断字符串是否 JSON 格式
 * @param str 
 * @returns 
 */
export const isJson = validator.isJSON

/**
 * 判断字符串是否 YAML 格式
 * @param str 
 * @returns 
 */
export function isYaml (str: string) {
  if (isJson(str)) return false
  try {
    return !!jsYaml.load(str)
  } catch (error) {
    return false
  }
}

/**
 * 读取配置文件
 * @param filename 
 * @param options 
 */
function loadDataFile (filename: string, options: LoadConfigOptions = {}) {
  let filePath = path.resolve(options.root ?? process.cwd(), filename)
  let __data: object | null | undefined
  if (!fs.existsSync(filePath)) return __data
  let extname = path.extname(filePath)
  if (!/^\.(js|json|yaml|yml)$/.test(extname)) return __data
  let fileStr = fs.readFileSync(filePath, 'utf-8')
  if (/^\.(js)$/.test(extname)) {
    return asyncRequire(filePath, { module, require, process, env: options.assign })
  }
  if (options.assign) {
    fileStr = template(fileStr, { interpolate: /{{([\s\S]+?)}}/g })(options.assign)
  }
  if (isYaml(fileStr)) {
    __data = jsYaml.load(fileStr)
  }
  else if (isJson(fileStr)) {
    __data = JSON.parse(fileStr)
  }
  return __data
}

/**
 * 读取配置文件 目录
 * @param name 
 * @param options 
 */
export function loadConfig (name: string, options: LoadConfigOptions = {}) {
  let filePath = path.resolve(options.root ?? process.cwd(), name)
  let __data: object | null | undefined
  if (!fs.existsSync(filePath)) return __data
  let fileStat = fs.statSync(filePath)
  if (fileStat.isFile()) return loadDataFile(filePath, options)
  if (fileStat.isDirectory()) {
    let files = fs.readdirSync(filePath)
    if (options.filter) {
      files = files.filter(options.filter)
    }
    __data = options.type === 'array' ? [] : {}
    for (let item of dataFileSort(files)) {
      let itemPath = path.resolve(filePath, item)
      let itemStat = fs.statSync(itemPath)
      if (/\.(js|json|yaml|yml)$/.test(item) || itemStat.isDirectory()) {
        let type: 'object' | 'array' = itemStat.isDirectory() ? 'array' : 'object'
        let itemdata = loadConfig(itemPath, { ...options, type })
        if (isArray(__data)) {
          __data.push(itemdata)
        }
        else {
          itemdata = isArray(itemdata) ? { [item]: itemdata } : itemdata
          let mergeFunc = options.mode === 'merge' ? merge : assign
          __data = mergeFunc(__data, itemdata)
        }
      }
    }
  }
  return __data
}

/**
 * 配置文件排序；将 *.default.(json|yaml|yml) 排到最前面, 将 *.release.(json|yaml|yml) 排到最后面
 * @param files 
 */
export function dataFileSort (files: string[]) {
  let regex = /^(\S+)\.(default)\.(json|yaml|yml)$/
  files = files.sort( (a, b) => a.replace(regex, '0$1.$3') > b.replace(regex, '0$1.$3') ? 1 : -1 )
  let regex_release = /^(\S+)\.(release)\.(json|yaml|yml)$/
  let absolute_release = /^(release)\.(json|yaml|yml)$/
  return [
    ...files.filter( name => !regex_release.test(name) ),
    ...files.filter( name => regex_release.test(name) && !absolute_release.test(name) ),
    ...files.filter( name => absolute_release.test(name) )
  ]
}

/**
 * 获取工作目录经过筛选的所有文件
 * @param patterns string[]
 * @param options glob.IOptions
 * @returns string[]
 */
export const pickFilesPromise = promisify(pickFilsCallback)

/**
 * 获取工作目录经过筛选的所有文件
 * @param patterns 
 * @param options 
 * @param done 
 */
export function pickFilsCallback (patterns: string[], options: glob.IOptions, done: CallbackWithResult<string[]>) {
  async.map(
    patterns,
    (pattern, done) => glob(pattern, options, done),
    (err, results: string[][]) => {
      if (err) {
        done(err)
      }
      else {
        let files = results?.reduce((files, item) => files?.concat(item) )
        done(null, files)
      }
    }
  )
}