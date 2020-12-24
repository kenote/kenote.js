const session = require('../..')
const redisStore = require('koa-redis')

module.exports = session({
  store: redisStore({})
})