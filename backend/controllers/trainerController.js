const User = require("../models/User");

//Get clients assigned to a trainer
const getTrainerClients = async (req, res) => {
  try {
    const { trainerName } = req.params;
    console.log(`Fetching clients for trainer: ${trainerName}`);

    // Find the trainer by name
    const trainer = await User.findOne({ name: trainerName, role: "trainer" });

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Find all clients assigned to this trainer
    const clients = await User.find({ trainer: trainer._id, role: "client" });

    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTrainerClients };
