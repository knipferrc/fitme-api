const jwt = require('jsonwebtoken')

const trainerMethods = UserSchema => {
  UserSchema.methods.getTrainersTotalClients = function(trainerId) {
    return this.model('User')
      .find({ trainerId })
      .count()
  }

  UserSchema.methods.getTrainersClients = function(trainerId) {
    return this.model('User').find({ trainerId })
  }

  UserSchema.methods.getAllTrainers = function() {
    return this.model('User').find({ role: TRAINER })
  }

  UserSchema.methods.updateTrainerProfile = async function(
    accessToken,
    firstName,
    lastName
  ) {
    const { userId } = await jwt.verify(accessToken, process.env.JWT_SECRET)

    let user = await this.model('User').findById(userId)
    user.set({ firstName, lastName })
    user = await user.save()

    return {
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
}

module.exports = trainerMethods
