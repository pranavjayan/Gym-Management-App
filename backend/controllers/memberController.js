const User = require("../models/User");


exports.getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};


exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "trainer" });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainers", error });
  }
};


exports.getClientById = async (req, res) => {
  try {
    const client = await User.findOne({ _id: req.params.id, role: "client" });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error fetching client", error });
  }
};


exports.updateClient = async (req, res) => {
  try {
    const { goal, trainer } = req.body;
    const updatedFields = {};

    if (goal) updatedFields.goal = goal;
    if (trainer) updatedFields.trainer = trainer;

    const updatedClient = await User.findOneAndUpdate(
      { _id: req.params.id, role: "client" },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};


exports.promoteToTrainer = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id, role: "client" },
      { $set: { role: "trainer" } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client promoted to Trainer", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error promoting client", error });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await User.findOneAndDelete({ _id: req.params.id, role: "client" });

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};
