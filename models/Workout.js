const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
  createdBy: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  exercises: [
    {
      exerciseName: String,
      muscleGroup: String,
      equipmentType: String,
      exerciseType: String,
      mechanicsType: String
    }
  ]
})

WorkoutSchema.methods.trainersWorkoutCount = function(trainerId) {
  return this.model('Workout')
    .find({ createdBy: trainerId })
    .count()
}

module.exports = mongoose.model('Workout', WorkoutSchema)
