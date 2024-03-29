
module.exports = {
  /**
   * Nuxt 2.13.0 后会收集有关常规用法的匿名遥测数据
   * 在开发环境下每次启动都会有提示，telemetry 选项可以让我们关闭它
   */
  telemetry: false,
  /**
   * 设定环境变量
   */
  env: {},
  /**
   * 设定源码目录
   */
  srcDir: 'web',
  /**
   * 忽略选项 
   */
  ignoreOptions: {
    ignorecase: false
  },
  /**
   * 页面 Loading 条设置
   */
  loading: {
    color: '#00c58e', 
    height: '2px'
  },
  /**
   * 加载 Style 样式
   */
  css: [
    '~/assets/less/common.less'
  ],
  /**
   * 加载插件
   */
  plugins: [
    '~/plugins/http-client',
    { src: '~/plugins/element-ui', ssr: true },
  ],
  /**
   * 配置组件
   */
  components: [
    '~/components'
  ],
  /**
   * 加载编译模块
   */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /**
   * 编译配置
   */
  build: {
    babel: {
      plugins: [
        ['component', {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }],
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ],
      comments: true
    }
  },
  /**
   * 映射路径
   */
  alias: {
    '@': __dirname
  },
  /**
   * 路由配置
   */
  router: {
    extendRoutes (routes, resolve) {

    }
  }
}