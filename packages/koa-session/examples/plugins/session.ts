import '../..'
import session from '../../src'
import redisStore from 'koa-redis'

export default session({
  store: redisStore({})
})