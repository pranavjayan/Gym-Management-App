import React, { useState, useEffect } from "react";
import axios from "axios";

const DietPlans = () => {
  const [dietPlan, setDietPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      fetchDietPlan();
    } else {
      console.error("User ID not found!");
    }
  }, [userId]);

  const fetchDietPlan = async () => {
    try {
      console.log(`Fetching diet plan for user ID: ${userId}`);
      const response = await axios.get(`https://gym-management-app-backend.onrender.com/api/diets/client/${userId}`);
      console.log("Fetched Diet Plan:", response.data);
      setDietPlan(response.data);
    } catch (error) {
      console.error("Error fetching diet plan:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <header className="text-yellow-400 text-3xl font-bold mb-6">
        Your Personalized Meal Plan
      </header>

      <div className="max-w-3xl w-full bg-gray-800 shadow-lg rounded-lg p-6">
        {dietPlan ? (
          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-yellow-500 text-black text-center">
                <th className="p-3 rounded-tl-lg">Meal Type</th>
                <th className="p-3 rounded-tr-lg">Food Items</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Breakfast", food: dietPlan.meals?.breakfast },
                { type: "Lunch", food: dietPlan.meals?.lunch },
                { type: "Snack", food: dietPlan.meals?.snack },
                { type: "Dinner", food: dietPlan.meals?.dinner },
              ].map((meal, index) => (
                <tr key={meal.type} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                  <td className="p-4 font-bold text-center border-b border-gray-500">{meal.type}</td>
                  <td className="p-4 text-center border-b border-gray-500">
                    {meal.food || <span className="text-gray-400">Not Assigned</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-400">No diet plan assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default DietPlans;
