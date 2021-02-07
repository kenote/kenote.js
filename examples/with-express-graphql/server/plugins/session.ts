import session from '@kenote/express-session'
import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import { createClient } from 'redis'

const RedisStore = connectRedis(expressSession)

export default session({
  secret: ['kenote'],
  store: new RedisStore({ client: createClient() }),
  resave: true,
  saveUninitialized: true
})