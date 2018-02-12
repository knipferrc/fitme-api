const userTrainerMethods = UserSchema => {
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
}

module.exports = userTrainerMethods
