const Progress = require("../models/Progress");


const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.params.userId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error });
  }
};


const addProgress = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);
    console.log("Received File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded" });
    }

    const { user, weight, description } = req.body;
    const newProgress = new Progress({
      user,
      weight,
      description,
      photo: `/uploads/${req.file.filename}`, 
      date: new Date(),
    });

    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ message: "Error saving progress", error });
  }
};

module.exports = { getProgress, addProgress };
