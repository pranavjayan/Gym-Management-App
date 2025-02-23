const Class = require("../models/Class");

// @desc    Add a new class schedule
// @route   POST /api/classes/add
// @access  Public
const addClass = async (req, res) => {
  try {
    const { name, instructor, time, date, description } = req.body;
    
    if (!name || !instructor || !time || !date || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newClass = new Class({ name, instructor, time, date, description });
    await newClass.save();

    res.status(201).json({ message: "Class added successfully", class: newClass });
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all class schedules
// @route   GET /api/classes
// @access  Public
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a class
// @route   DELETE /api/classes/:id
// @access  Public
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a class schedule
// @route   PUT /api/classes/:id
// @access  Public
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, instructor, time, date, description } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, instructor, time, date, description },
      { new: true } // Return the updated document
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class updated successfully", class: updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔥 Export all functions properly
module.exports = { addClass, getAllClasses, deleteClass, updateClass };
