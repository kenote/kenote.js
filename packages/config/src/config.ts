import jsYaml from 'js-yaml'
import path from 'path'
import fs from 'fs'
import validator from 'validator'
import { isArray, assign, merge, template } from 'lodash'
import { LoadConfigOptions } from '../types'


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
  if (!/^\.(json|yaml|yml)$/.test(extname)) return __data
  let fileStr = fs.readFileSync(filePath, 'utf-8')
  if (options.assign) {
    fileStr = template(fileStr, { interpolate: /{{([\s\S]+?)}}/g })(options.assign)
  }
  if (validator.isJSON(fileStr) && /^\.(json)$/.test(extname)) {
    __data = JSON.parse(fileStr)
  }
  else {
    __data = jsYaml.load(fileStr)
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
      if (/\.(json|yaml|yml)$/.test(item) || itemStat.isDirectory()) {
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