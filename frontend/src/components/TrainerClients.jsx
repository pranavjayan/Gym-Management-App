import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrainerClients = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const trainerName = JSON.parse(localStorage.getItem("user"))?.name;

  useEffect(() => {
    if (!trainerName) {
      navigate("/login");
      return;
    }

    const fetchClients = async () => {
      try {
        const response = await axios.get(
          `https://gym-management-app-backend.onrender.com/api/trainers/clients/${trainerName}`
        );
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error.response?.data || error.message);
      }
    };

    fetchClients();
  }, [trainerName, navigate]);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.mobile.includes(searchQuery)
  );

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen p-6 md:p-8">
      <h1 className="text-yellow-400 text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
        My Clients
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or mobile..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 w-full max-w-lg rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto mt-6">
        <table className="w-full text-left bg-gray-800 rounded-lg">
          <thead className="bg-yellow-400 text-black">
            <tr className="text-sm md:text-base">
              <th className="p-3 md:p-4">Name</th>
              <th className="p-3 md:p-4">Email</th>
              <th className="p-3 md:p-4">Mobile</th>
              <th className="p-3 md:p-4">Goal</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client._id} className="border-b border-gray-700 text-sm md:text-base">
                  <td className="p-3 md:p-4">{client.name}</td>
                  <td className="p-3 md:p-4 break-words max-w-xs md:max-w-none">
                    {client.email}
                  </td>
                  <td className="p-3 md:p-4">{client.mobile}</td>
                  <td className="p-3 md:p-4">{client.goal || "Not Set"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No assigned clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerClients;
