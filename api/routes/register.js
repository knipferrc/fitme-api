const passport = require('passport')
const router = require('express').Router()
const Auth = require('../models/Auth')

router.post('/', async (req, res) => {
  const AuthModel = new Auth(req.app.locals.db)
  AuthModel.setCollection('users')

  const { email, password, firstName, lastName } = req.body

  try {
    return AuthModel.register(email, password, firstName, lastName)
  } catch (error) {
    throw new Error(error.message)
  }
})

module.exports = router
