const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Mongo = require('./Mongo')

class Auth extends Mongo {
  constructor(db) {
    super(db)
  }

  async register(email, password, firstName, lastName) {
    this.setCollection('users')
    const duplicateUser = await this.getCountByFilter({ email })

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

      const { insertedId } = await this.createDoc(userDetails)

      const { _id: userId } = await this.getById(insertedId)

      return jwt.sign({ userId }, process.env.JWT_SECRET)
    }
  }
}

module.exports = Auth
