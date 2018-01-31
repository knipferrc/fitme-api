const passport = require('passport')
const router = require('express').Router()

router.post('/', passport.authenticate('google-token'), (req, res) => {
  console.log('REQ: ', req.user)
})

module.exports = router
