const router = require('express').Router()

router.get('/', async (req, res) => {
  req.logOut()
  return res.json({
    success: true,
    message: 'Logout Successful!'
  })
})

module.exports = router
