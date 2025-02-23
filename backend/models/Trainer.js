const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  photo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Trainer", TrainerSchema);