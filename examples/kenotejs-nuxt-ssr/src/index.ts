import http from 'http'
import { ServerFactory } from '@kenote/core'
import { ServiceEngine } from '@kenote/koa'
import appModule from './app.module'
import { loadConfig } from '@kenote/config'
import { ServerConfigure } from '@/types/config'
import { logger } from '~/services'

const SERVER_HOST = process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost'
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000

async function bootstarp () {
  let { host, port, secretKey } = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })
  // 创建服务
  let factory = await ServerFactory(new ServiceEngine({ keys: [secretKey] })).create(appModule)
  let server = http.createServer(factory.server)
  let Host = host ?? SERVER_HOST
  let Port = port ?? SERVER_PORT
  server.listen(Port, Host, () => {
    logger.info('Http Server Running to http://%s:%d', Host, Port)
  })
}

bootstarp()
