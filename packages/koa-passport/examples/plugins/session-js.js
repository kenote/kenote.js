const session = require('@kenote/koa-session')
const redisStore = require('koa-redis')

module.exports = session({
  store: redisStore({})
})