
import * as esprima from 'esprima'
import escodegen from 'escodegen'
import { evaluate } from 'eval5'

/**
 * 读取Js代码
 * @param source 
 */
export function readCode (source: string) {
  let ast = esprima.parseModule(source)
  let result = escodegen.generate(ast)
  return evaluate(result)
}