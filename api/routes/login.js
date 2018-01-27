const passport = require('passport')
const router = require('express').Router()
const Auth = require('../models/Auth')

router.post('/', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      if (err.name === 'IncorrectCredentials') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      if (err.name === 'UserNotFound') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      return res.json({
        success: true,
        user
      })
    })
  })(req, res)
})

module.exports = router
