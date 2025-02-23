const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference User model
  date: { type: String, required: true },
  workoutType: { type: String, required: true },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
    },
  ],
});

module.exports = mongoose.model("Workout", workoutSchema);
