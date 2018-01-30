const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  exerciseName: {
    type: String,
    required: true,
    unique: true
  },
  muscleGroup: {
    type: String
  },
  equipmentType: {
    type: String
  },
  exerciseType: {
    type: String
  },
  mechanicsType: {
    type: String
  }
})

ExerciseSchema.methods.getTrainersTotalExercises = function(trainerId) {
  return this.model('Exercise')
    .find({ createdBy: trainerId })
    .count()
}

module.exports = mongoose.model('Exercise', ExerciseSchema)
