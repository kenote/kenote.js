import session from '@kenote/express-session'
import expressSession from 'express-session'
import { loadConfig } from '@kenote/config'
import { ServerConfigure } from '@/types/config'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'

const { secretKey, redisOpts } = loadConfig<ServerConfigure>('config/server', { mode: 'merge' })
const RedisStore = connectRedis(expressSession)

export default session({
  secret: secretKey,
  store: new RedisStore({ client: new Redis(redisOpts) }),
  resave: true,
  saveUninitialized: true
})
