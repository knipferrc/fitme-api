const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

const register = async (
  root,
  { email, password, firstName, lastName },
  { db }
) => {
  const userCollection = db.collection('users')
  const duplicateUser = await userCollection.find({ email }).count()

  if (duplicateUser >= 1) throw new Error('User already exists.')
  else {
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds)

    const userDetails = {
      email,
      password: hash,
      firstName,
      lastName
    }

    const { insertedId } = await userCollection.insertOne(userDetails)

    const { _id: userId } = await userCollection.findOne(ObjectId(insertedId))

    return jwt.sign({ userId }, process.env.JWT_SECRET)
  }
}

module.exports = register
