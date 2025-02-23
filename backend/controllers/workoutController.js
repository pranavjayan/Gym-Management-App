const Workout = require("../models/Workout");

// Get all workouts 
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate("client", "name"); 
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching workouts" });
  }
};

// Get workouts for a specific client(client Dash)
exports.getClientWorkouts = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const workouts = await Workout.find({ client: clientId });

    if (!workouts.length) {
      return res.status(404).json({ message: "No workouts found for this client." });
    }

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching client workouts" });
  }
};

// Create a new workout 
exports.createWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: "Error creating workout" });
  }
};

// Update a workout 
exports.updateWorkout = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: "Error updating workout" });
  }
};

// Delete a workout 
exports.deleteWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting workout" });
  }
};
