const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
