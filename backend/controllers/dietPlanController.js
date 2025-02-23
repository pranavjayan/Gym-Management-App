const DietPlan = require("../models/DietPlan");


exports.createDietPlan = async (req, res) => {
  try {
    const { client, meals } = req.body; 

    if (!client) {
      return res.status(400).json({ message: "Client ID is required" });
    }

    const newDietPlan = new DietPlan({
      client,
      meals: {
        breakfast: meals?.breakfast || "Not assigned",
        lunch: meals?.lunch || "Not assigned",
        snack: meals?.snack || "Not assigned",
        dinner: meals?.dinner || "Not assigned",
      },
    });

    await newDietPlan.save();
    res.status(201).json({ message: "Diet plan created successfully", dietPlan: newDietPlan });
  } catch (error) {
    console.error("Error creating diet plan:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllDietPlans = async (req, res) => {
  try {
    const dietPlans = await DietPlan.find().populate("client", "name");
    res.status(200).json(dietPlans);
  } catch (error) {
    console.error("Error fetching all diet plans:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getDietPlanByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    console.log(`Fetching diet plan for client ID: ${clientId}`);

    const dietPlan = await DietPlan.findOne({ client: clientId }).populate("client", "name");

    if (!dietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }

    res.status(200).json(dietPlan);
  } catch (error) {
    console.error("Error fetching diet plan for client:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateDietPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { client, meals } = req.body; 

    console.log(`Updating diet plan ID: ${id}`);

    const updatedDietPlan = await DietPlan.findByIdAndUpdate(
      id,
      {
        client,
        meals: {
          breakfast: meals?.breakfast || "Not assigned",
          lunch: meals?.lunch || "Not assigned",
          snack: meals?.snack || "Not assigned",
          dinner: meals?.dinner || "Not assigned",
        },
      },
      { new: true }
    );

    if (!updatedDietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }

    res.status(200).json({ message: "Diet plan updated successfully", updatedDietPlan });
  } catch (error) {
    console.error("Error updating diet plan:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteDietPlan = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting diet plan ID: ${id}`);

    const deletedDietPlan = await DietPlan.findByIdAndDelete(id);

    if (!deletedDietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }

    res.status(200).json({ message: "Diet plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
