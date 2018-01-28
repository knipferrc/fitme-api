const router = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../mongooseModels/User')

router.post('/', async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const foundUser = await User.findOne({ email })

  if (foundUser) {
    return res.status(403).json({
      success: false,
      message: 'Email is already in use'
    })
  }

  const newUser = new User({ email, password, firstName, lastName })
  const savedUser = await newUser.save()

  const accessToken = jwt.sign(
    { userId: savedUser._id },
    process.env.JWT_SECRET
  )

  const user = {
    accessToken,
    role: savedUser.role,
    email: savedUser.email,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName
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
})

module.exports = router
