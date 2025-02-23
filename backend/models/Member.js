const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
  admissionNumber: { type: String, unique: true, required: true },
  goal: { type: String, default: "Not Assigned" },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // References a trainer
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
