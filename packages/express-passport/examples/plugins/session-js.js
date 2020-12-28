const session = require('@kenote/express-session')
const connectRedis = require('connect-redis')
const expressSession = require('express-session')
const redis = require('redis')

const RedisStore = connectRedis(expressSession)

module.exports = key => session({
  secret: key,
  store: new RedisStore({ client: redis.createClient() }),
  resave: true,
  saveUninitialized: true
})