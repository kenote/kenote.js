const koaPassport = require('../..')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy(
  (username, password, done) => {
    return done(null, { username })
  }
))

module.exports = koaPassport()