import React, { useState, useEffect } from "react";
import axios from "axios";

const WORKOUTS_API = "https://gym-management-app-backend.onrender.com/api/workouts"; // Update with your backend route

const TrainerWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState({ name: "", reps: "", sets: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Fetch all workouts from backend
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(WORKOUTS_API);
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!workout.name || !workout.reps || !workout.sets) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editId) {
        // Update existing workout
        await axios.put(`${WORKOUTS_API}/${editId}`, workout);
      } else {
        // Add new workout
        await axios.post(WORKOUTS_API, workout);
      }
      fetchWorkouts();
      setWorkout({ name: "", reps: "", sets: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (id) => {
    const workoutToEdit = workouts.find((w) => w._id === id);
    setWorkout(workoutToEdit);
    setEditId(id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await axios.delete(`${WORKOUTS_API}/${id}`);
        fetchWorkouts();
      } catch (error) {
        console.error("Error deleting workout:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold text-yellow-400 text-center mb-8">
        Manage Workouts
      </h2>

      {/* Form to add/edit workout */}
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
          {editId ? "Edit Workout" : "Add Workout"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Workout Name</label>
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Reps</label>
            <input
              type="number"
              name="reps"
              value={workout.reps}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Sets</label>
            <input
              type="number"
              name="sets"
              value={workout.sets}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
          >
            {editId ? "Update Workout" : "Add Workout"}
          </button>
        </form>
      </div>

      {/* Workout List Table */}
      <div className="max-w-4xl mx-auto mt-8">
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-yellow-500 text-black">
              <th className="p-4">#</th>
              <th className="p-4">Workout Name</th>
              <th className="p-4">Reps</th>
              <th className="p-4">Sets</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length > 0 ? (
              workouts.map((w, index) => (
                <tr key={w._id} className="border-b border-gray-700">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{w.name}</td>
                  <td className="p-4">{w.reps}</td>
                  <td className="p-4">{w.sets}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(w._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(w._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No workouts added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerWorkout;
