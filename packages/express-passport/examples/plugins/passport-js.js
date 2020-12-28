const expressPassport = require('../..')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

module.exports = expressPassport()