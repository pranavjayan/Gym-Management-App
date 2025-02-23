import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientWorkoutDisplay = () => {
  const [workouts, setWorkouts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    if (user?._id) {
      fetchClientWorkouts();
    }
  }, [user]);

  const fetchClientWorkouts = async () => {
    try {
      console.log(`Fetching workouts for client ID: ${user._id}`);
      const response = await axios.get(`http://localhost:5000/api/workouts/client/${user._id}`);
      console.log("Fetched Workouts:", response.data);
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching client workouts:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <header className="text-yellow-400 text-3xl font-bold mb-6 text-center">
        Custom Workouts Crafted For You
      </header>

      <div className="max-w-4xl w-full bg-gray-800 shadow-lg rounded-lg p-6 overflow-x-auto">
        <h2 className="text-2xl text-yellow-400 text-center mb-6">Workout Log</h2>
        {workouts.length === 0 ? (
          <p className="text-center text-gray-400">No workouts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-lg min-w-[600px]">
              <thead>
                <tr className="bg-yellow-500 text-black text-center">
                  <th className="p-3 rounded-tl-lg">Date</th>
                  <th className="p-3">Workout Type</th>
                  <th className="p-3 rounded-tr-lg">Exercises</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((w, index) => (
                  <tr
                    key={w._id}
                    className={`text-center border-b border-gray-600 ${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                    } hover:bg-gray-500 transition duration-200`}
                  >
                    <td className="p-4 font-bold">{new Date(w.date).toLocaleDateString()}</td>
                    <td className="p-4">{w.workoutType}</td>
                    <td className="p-4">
                      <ul className="list-disc pl-4 text-left">
                        {w.exercises.map((ex, index) => (
                          <li key={index} className="py-1">
                            <span className="font-semibold">{ex.name}</span> - {ex.sets} Sets x {ex.reps} Reps
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientWorkoutDisplay;