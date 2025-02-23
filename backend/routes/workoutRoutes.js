const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");


router.get("/", workoutController.getWorkouts);
router.get("/client/:clientId", workoutController.getClientWorkouts);  // Get workouts for a specific client
router.post("/", workoutController.createWorkout);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);

module.exports = router;
