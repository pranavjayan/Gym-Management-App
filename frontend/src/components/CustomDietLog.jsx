import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomDietLog = () => {
  const [diet, setDiet] = useState({
    client: "",
    meals: { breakfast: "", lunch: "", snack: "", dinner: "" },
  });
  const [clients, setClients] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);
  const [editId, setEditId] = useState(null);

  const trainerName = JSON.parse(localStorage.getItem("user"))?.name || "";

  useEffect(() => {
    fetchClients();
    fetchDietPlans();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/trainers/clients/${trainerName}`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchDietPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/diets");
      setDietPlans(response.data);
    } catch (error) {
      console.error("Error fetching diet plans:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiet((prev) => ({ ...prev, [name]: value }));
  };

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setDiet((prev) => ({ ...prev, meals: { ...prev.meals, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/diets/${editId}`, diet);
      } else {
        await axios.post("http://localhost:5000/api/diets", diet);
      }
      fetchDietPlans();
      setDiet({ client: "", meals: { breakfast: "", lunch: "", snack: "", dinner: "" } });
      setEditId(null);
    } catch (error) {
      console.error("Error saving diet plan:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <header className="text-yellow-400 text-3xl font-bold text-center mb-6">Custom Diet Plans</header>
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-yellow-400 text-center mb-6">{editId ? "Update Diet Plan" : "Assign Diet Plan"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="client"
            value={diet.client}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
          {Object.keys(diet.meals).map((meal) => (
            <input
              key={meal}
              type="text"
              name={meal}
              value={diet.meals[meal]}
              onChange={handleMealChange}
              placeholder={meal.charAt(0).toUpperCase() + meal.slice(1)}
              className="w-full p-2 bg-gray-700 text-white rounded-md"
            />
          ))}
          <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded-md">{editId ? "Update" : "Save"}</button>
        </form>
      </div>

      <div className="mt-8 max-w-3xl mx-auto overflow-x-auto">
        <h2 className="text-2xl text-yellow-400 text-center mb-4">Diet Plans List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-white min-w-max">
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="p-2">Client</th>
                <th className="p-2">Breakfast</th>
                <th className="p-2">Lunch</th>
                <th className="p-2">Snack</th>
                <th className="p-2">Dinner</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dietPlans.map((d) => (
                <tr key={d._id} className="border-b border-gray-700 text-center">
                  <td className="p-2">{d.client?.name || "Unknown"}</td>
                  <td className="p-2">{d.meals?.breakfast || "Not Set"}</td>
                  <td className="p-2">{d.meals?.lunch || "Not Set"}</td>
                  <td className="p-2">{d.meals?.snack || "Not Set"}</td>
                  <td className="p-2">{d.meals?.dinner || "Not Set"}</td>
                  <td className="p-2 flex justify-center space-x-2">
                    <button onClick={() => setEditId(d._id)} className="bg-blue-500 px-2 py-1 rounded">Edit</button>
                    <button onClick={() => axios.delete(`http://localhost:5000/api/diets/${d._id}`).then(fetchDietPlans)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomDietLog;