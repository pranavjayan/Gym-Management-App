import React, { useState, useEffect } from "react";
import axios from "axios";

const TRAINERS_API = "https://gym-management-app-backend.onrender.com/api/users/trainers";
const DELETE_API = "https://gym-management-app-backend.onrender.com/api/users";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(TRAINERS_API);
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (trainerId) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await axios.delete(`${DELETE_API}/${trainerId}`);
        setTrainers(trainers.filter((trainer) => trainer._id !== trainerId));
      } catch (error) {
        console.error("Error deleting trainer:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 sm:p-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 text-center mb-6">Trainers List</h2>

      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg min-w-[600px]">
          <thead>
            <tr className="bg-yellow-500 text-black text-sm sm:text-base">
              <th className="p-3 sm:p-4">Name</th>
              <th className="p-3 sm:p-4">Email</th>
              <th className="p-3 sm:p-4 hidden sm:table-cell">Mobile</th>
              <th className="p-3 sm:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <tr key={trainer._id} className="border-b border-gray-700 text-sm sm:text-base">
                  <td className="p-3">{trainer.name}</td>
                  <td className="p-3">{trainer.email}</td>
                  <td className="p-3 hidden sm:table-cell">{trainer.mobile}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(trainer._id)}
                      className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded font-bold text-xs sm:text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainers;
