const passport = require('passport')
const router = require('express').Router()
const Auth = require('../models/Auth')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const AuthModel = new Auth(req.app.locals.db)
    AuthModel.setCollection('users')

    const { email, password } = req.body

    try {
      return AuthModel.login(email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }
)

module.exports = router
