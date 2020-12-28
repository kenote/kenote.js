import expressPassport from '@kenote/express-passport'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

// Add Local Strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

export default expressPassport()