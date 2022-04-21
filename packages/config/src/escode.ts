
import * as esprima from 'esprima'
import escodegen from 'escodegen'
import { evaluate } from 'eval5'
import { runInNewContext } from 'vm'

/**
 * 读取Js代码
 * @param source 
 */
export function readCode (source: string, ctx?: NodeJS.Dict<any>) {
  let ast = esprima.parseModule(source)
  let result = escodegen.generate(ast)
  try {
    return runInNewContext(result, ctx)
  } catch (error) {
    return evaluate(result, ctx)
  }
}