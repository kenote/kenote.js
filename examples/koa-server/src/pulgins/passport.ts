import koaPassport from '@kenote/koa-passport'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

// Add Local Strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

export default koaPassport()