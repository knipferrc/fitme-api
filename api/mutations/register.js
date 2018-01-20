const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

const register = async (
  root,
  { email, password, firstName, lastName },
  { Auth }
) => Auth.register(email, password, firstName, lastName)

module.exports = register
