import {} from '../..'
import koaPassport from '../../src'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

export default koaPassport()