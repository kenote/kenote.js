const session = require('../..')
const connectRedis = require('connect-redis')
const expressSession = require('express-session')
const redis = require('redis')

const RedisStore = connectRedis(expressSession)

module.exports = session({
  secret: ['kenote'],
  store: new RedisStore({ client: redis.createClient() }),
  resave: true,
  saveUninitialized: true
})