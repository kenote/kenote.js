
export declare interface CompileConfigure {
  /**
   * 入口文件
   */
  entry        : string
  /**
   * 源码目录；默认 src/
   */
  srcDir       : string
  /**
   * Ts 配置文件；默认 tsconfig.json
   */
  tsconfig     : string
  /**
   * 编译选项
   */
  build        : CompileConfigure.Build
  /**
   * 开发选项
   */
  develop      : CompileConfigure.Develop
  /**
   * 预先处理脚本
   */
  commands    ?: string[]
}

export namespace CompileConfigure {

  interface Build {
    /**
     * 编译输出目录；默认 dist/
     */
    outDir       : string
    /**
     * 编译时是否清空编译目录；默认 false
     */
    emptyOutDir  : boolean
  }

  interface Develop {
    /**
     * 监听文件
     */
    watch       ?: string[]
    /**
     * 忽略文件
     */
    ignore      ?: string[]
    /**
     * 环境变量
     */
    env         ?: Record<string, string | number | boolean>
    /**
     * 监听扩展名
     */
    ext         ?: string
    /**
     * 默认运行端口
     */
    port        ?: number
  }
}