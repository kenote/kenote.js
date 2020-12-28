import {} from '../..'
import expressPassport from '../../src'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

export default expressPassport()