const passport = require('passport')
const router = require('express').Router()

router.post('/', (req, res) => {
  console.log('hello ', req.body)
  passport.authenticate('google', { scope: ['profile', 'email'] })
})

router.get('/callback', (req, res) => {
  console.log('REQ: ', req)
  console.log('RES: ', res)
})

module.exports = router
