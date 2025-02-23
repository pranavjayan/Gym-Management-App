const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "trainer", "client"], default: "client" },
  goal: { type: String, default: "" }, // Weight Loss, Muscle Gain, etc.
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Assigned trainer
});

module.exports = mongoose.model("User", UserSchema);
