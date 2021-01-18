
/**
 * 异步导入JS
 * @param url 
 */
export declare function urlRequire (url: string): Promise<any>

/**
 * 运行Js代码
 * @param code 
 */
export declare function runJScript (source: string): any