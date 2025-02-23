require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

const app = express();

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


connectDB();


app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(uploadPath)); 


const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const classRoutes = require("./routes/classRoutes");
const memberRoutes = require("./routes/memberRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietPlanRoutes = require("./routes/dietPlanRoutes");
const progressRoutes = require("./routes/progressRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/users", memberRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/diets", dietPlanRoutes);
app.use("/api/progress", progressRoutes);


app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
