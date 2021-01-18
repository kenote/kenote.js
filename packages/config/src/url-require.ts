
import * as esprima from 'esprima'
import escodegen from 'escodegen'
import request from 'request'

/**
 * 异步导入JS
 * @param url 
 */
export async function urlRequire (url: string) {
  let source = await new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(body)
      }
    })
  })
  return runJScript(source as string)
}

/**
 * 运行Js代码
 * @param code 
 */
export function runJScript (source: string) {
  let ast = esprima.parseModule(source)
  let result = escodegen.generate(ast)
  // tslint:disable-next-line: no-eval
  return eval(result)
}