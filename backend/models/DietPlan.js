const mongoose = require("mongoose");

const DietPlanSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meals: {
    breakfast: { type: String, default: "Not assigned" },
    lunch: { type: String, default: "Not assigned" },
    snack: { type: String, default: "Not assigned" },
    dinner: { type: String, default: "Not assigned" }
  }
});

module.exports = mongoose.model("DietPlan", DietPlanSchema);
