import React, { useEffect, useState } from "react";
import axios from "axios";

const USERS_API = "http://localhost:5000/api/users";
const TRAINERS_API = "http://localhost:5000/api/users/trainers";

const MemberManagement = () => {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchTrainers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_API);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(TRAINERS_API);
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleGoalChange = async (userId, newGoal) => {
    try {
      await axios.put(`${USERS_API}/${userId}`, { goal: newGoal });
      setUsers(users.map((user) => (user._id === userId ? { ...user, goal: newGoal } : user)));
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleTrainerChange = async (userId, trainerId) => {
    try {
      await axios.put(`${USERS_API}/${userId}`, { trainer: trainerId });
      setUsers(users.map((user) => (user._id === userId ? { ...user, trainer: trainerId } : user)));
    } catch (error) {
      console.error("Error assigning trainer:", error);
    }
  };

  const handlePromoteToTrainer = async (userId) => {
    try {
      const response = await axios.put(`${USERS_API}/${userId}/promote`);
      if (response.status === 200) {
        alert("User promoted to Trainer!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "trainer" } : user
          )
        );
        fetchTrainers();
      }
    } catch (error) {
      console.error("Error promoting user:", error.response?.data || error.message);
      alert("Failed to promote user.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery)
  );

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen p-6 sm:p-10">
      <h1 className="text-yellow-400 text-3xl sm:text-4xl font-bold text-center mb-6">
        Member Management
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or mobile..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 w-full max-w-lg rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Users Table */}
      <div className="max-w-6xl mx-auto mt-6 overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg min-w-[600px]">
          <thead className="bg-yellow-400 text-black">
            <tr className="text-sm sm:text-base">
              <th className="p-3 sm:p-4">Name</th>
              <th className="p-3 sm:p-4">Email</th>
              <th className="p-3 sm:p-4 hidden sm:table-cell">Mobile</th>
              <th className="p-3 sm:p-4">Goal</th>
              <th className="p-3 sm:p-4">Trainer</th>
              <th className="p-3 sm:p-4">Role</th>
              <th className="p-3 sm:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-700 text-sm sm:text-base">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 hidden sm:table-cell">{user.mobile}</td>

                  {/* Goal Dropdown */}
                  <td className="p-3">
                    <select
                      value={user.goal || ""}
                      onChange={(e) => handleGoalChange(user._id, e.target.value)}
                      className="bg-gray-700 text-white p-1 sm:p-2 rounded w-full"
                    >
                      <option value="">Select Goal</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Endurance">Endurance</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </td>

                  {/* Assign Trainer Dropdown */}
                  <td className="p-3">
                    <select
                      value={user.trainer || ""}
                      onChange={(e) => handleTrainerChange(user._id, e.target.value)}
                      className="bg-gray-700 text-white p-1 sm:p-2 rounded w-full"
                    >
                      <option value="">Assign Trainer</option>
                      {trainers.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3">{user.role}</td>

                  {/* Promote to Trainer */}
                  <td className="p-3">
                    {user.role !== "trainer" && (
                      <button
                        onClick={() => handlePromoteToTrainer(user._id)}
                        className="bg-yellow-500 text-black px-3 py-1 sm:px-4 sm:py-2 rounded font-bold text-xs sm:text-sm"
                      >
                        Promote
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagement;
