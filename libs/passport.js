const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const jwt_decode = require("jwt-decode");

const DB = require('../models/index');
const User = DB.User
const config = require('../config/index')

const localOptions = { usernameField: 'email' }

const localLogin = new LocalStrategy(localOptions, (login, password, done) => {
  User.findOne({where: {email: login}}).then(user => {
    if (!user) return done(null, false)
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false)
      return done(null, user)
    })
  }).catch(e => done(e))
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.auth.jwt.secret,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findOne({where: {email: payload.sub}})
    .then(user => user ? done(null, user) : done(null, false))
    .catch(e => done(e, false))
})

const socketPassport = {
  jwtLogin: (socket, done) => {
    const token = socket.handshake.auth.authToken;
    var payload = jwt_decode(token);
    User.findOne({where: {email: payload.sub}})
      .then(user => {
        socket.request.user = user;
        return user ? done(null, user) : done(null, false)
      })
      .catch(e => done(e, false))
  }
}

module.exports = {
  jwt: jwtLogin,
  local: localLogin,
  socketPassport: socketPassport
}
