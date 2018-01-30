const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
  workoutName: {
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
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

WorkoutSchema.methods.getTrainersTotalWorkouts = function(trainerId) {
  return this.model('Workout')
    .find({ createdBy: trainerId })
    .count()
}

module.exports = mongoose.model('Workout', WorkoutSchema)
