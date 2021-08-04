
import * as esprima from 'esprima'
import escodegen from 'escodegen'

/**
 * 读取Js代码
 * @param source 
 */
export function readCode (source: string) {
  let ast = esprima.parseModule(source)
  let result = escodegen.generate(ast)
  // tslint:disable-next-line: no-eval
  return eval(result)
}