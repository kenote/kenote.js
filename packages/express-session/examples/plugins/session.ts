import {} from '../..'
import session from '../../src'
import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import { createClient } from 'redis'

const RedisStore = connectRedis(expressSession)

export default (keys: string | string[]) => session({
  secret: keys,
  store: new RedisStore({ client: createClient() }),
  resave: true,
  saveUninitialized: true
})