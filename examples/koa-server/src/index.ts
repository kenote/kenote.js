import { ServerFactory } from '@kenote/core'
import ApplicationModule from './application.module'

async function bootstrap () {
  // 加载服务端引擎
  let { ServiceEngine } = await import('@kenote/koa')
  // 创建服务并加载模块
  let server = await ServerFactory(new ServiceEngine({ keys: ['kenote'] })).create(ApplicationModule)
  // // 将服务监听到 4000 端口
  server.app.listen(4000, () => {
    console.log('starting...')
  })
}

// 启动服务
bootstrap()