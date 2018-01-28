const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const compression = require('compression')
const passport = require('passport')

module.exports = () => {
  const middleware = [
    express.json(),
    express.urlencoded({ extended: false }),
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }
    }),
    cors(),
    helmet(),
    compression(),
    hpp(),
    passport.initialize(),
    passport.session()
  ]
  return (req, res, next) => {
    ;(function iter(i, max) {
      if (i === max) {
        return next()
      }
      middleware[i](req, res, iter.bind(this, i + 1, max))
    })(0, middleware.length)
  }
}
