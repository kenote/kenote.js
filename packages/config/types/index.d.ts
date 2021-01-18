
export declare interface LoadConfigOptions {
  /**
   * 设置根目录
   */
  root         ?: string
  /**
   * 合并类型   object | array
   */
  type         ?: 'object' | 'array'
  /**
   * 合并模式   assign | merge
   */
  mode         ?: 'assign' | 'merge'
  /**
   * 排除规则
   */
  filter       ?: (value: string, index: number) => boolean
  /**
   * 变量替换
   */
  assign       ?: object
}

/**
 * 配置文件排序；将 *.default.(json|yaml|yml) 排到最前面, 将 *.release.(json|yaml|yml) 排到最后面
 * @param files 
 */
export declare function dataFileSort (files: string[]): string[]

/**
 * 
 * @param name 
 * @param options 
 */
export declare function loadConfig<T> (name: string): T
export declare function loadConfig<T> (name: string, options: LoadConfigOptions): T

/**
 * 异步导入JS
 * @param filename 
 */
export declare function asyncRequire (filename: string): any

/**
 * 运行Js代码
 * @param code 
 */
export declare function runJScript (source: string): any