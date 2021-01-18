
import * as esprima from 'esprima'
import escodegen from 'escodegen'

import fs from 'fs'

/**
 * 异步导入JS
 * @param filename 
 */
export function asyncRequire (filename: string) {
  let file = require.resolve(filename)
  if (!fs.existsSync(file)) return undefined
  let source = fs.readFileSync(file, 'utf-8')
  return runJScript(source)
}

/**
 * 运行Js代码
 * @param code 
 */
export function runJScript (source: string) {
  let ast = esprima.parseScript(source)
  let result = escodegen.generate(ast)
  // tslint:disable-next-line: no-eval
  return eval(result)
}