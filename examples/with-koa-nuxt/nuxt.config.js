// Nuxt Configure

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
   * 设定客户端源码目录
   */
  srcDir: 'client',
  /**
   * 忽略选项 
   */
  ignoreOptions: {
    ignorecase: false
  },
  /**
   * Meta Tags and SEO
   */
  head: {
    title: 'my website title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /**
   * 加载 Style 样式
   */
  css: [
    '~/assets/scss/common.scss'
  ],
  /**
   * 加载插件
   */
  plugins: [
    
  ],
  /**
   * 页面 Loading 条设置
   */
  loading: {
    color: '#00c58e', 
    height: '2px'
  },
  /**
   * 加载编译模块
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/components'
  ],
  /**
   * 配置组件
   */
  components: [
    '~/components'
  ],
  /**
   * 路由配置
   */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/',
        component: resolve(__dirname, 'client/pages/home.vue')
      })
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'client/components/error-page.vue')
      })
    }
  }
}