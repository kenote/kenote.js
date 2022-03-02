import session from '@kenote/koa-session'
import { loadConfig } from '@kenote/config'
import { ServerConfigure } from '@/types/config'
import redisStore from 'koa-redis'

const { secretKey, redisOpts } = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })

export default session({
  key: secretKey,
  store: redisStore(redisOpts),
})
