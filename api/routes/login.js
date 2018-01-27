const passport = require('passport')
const router = require('express').Router()
const Auth = require('../models/Auth')

router.post('/', passport.authenticate('local'), (req, res) => {
  const { user } = req
  const { accessToken } = user

  return res.json({
    success: true,
    accessToken,
    user
  })
})

module.exports = router
