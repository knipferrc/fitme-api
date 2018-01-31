const express = require('express')
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const compression = require('compression')

module.exports = () => {
  const middleware = [
    express.json(),
    express.urlencoded({ extended: false }),
    cors(),
    helmet(),
    compression(),
    hpp()
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
