import React, { useState } from "react";
import { ForkKnife, XCircle } from "lucide-react";

const dietPlans = {
  Bulking: {
    Monday: {
      meals: [
        { category: "Breakfast", meal: "Moong Dal Chilla with Paneer", details: "Moong dal, Cottage Cheese, Cucumber, and Tomato" },
        { category: "Lunch", meal: "Grilled Chicken with Brown Rice", details: "Grilled Chicken Breast, Brown Rice, Spinach" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
    Tuesday: {
      meals: [
        { category: "Breakfast", meal: "Idli with Sambar and Coconut Chutney", details: "Steamed Idli, Lentil Sambar, Coconut Chutney" },
        { category: "Lunch", meal: "Paneer Tikka with Paratha", details: "Grilled Paneer, Whole Wheat Paratha, Raita" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Grilled Fish with Salad", details: "Grilled Fish, Cucumber, Carrot, Lettuce" },
      ],
    },
  },
  Cutting: {
    Monday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Tofu with Spinach Salad", details: "Grilled Tofu, Spinach, Lemon" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
  },
};

const MealCard = ({ day, onClick }) => (
  <div
    className="bg-gray-800 p-6 rounded-lg text-center shadow-lg cursor-pointer hover:bg-gray-700 transition"
    onClick={onClick}
    aria-label={`View meals for ${day}`}
  >
    <ForkKnife className="text-yellow-400 mx-auto" size={48} />
    <h2 className="text-xl font-semibold mt-4">{day}</h2>
    <button className="text-yellow-400 mt-2">View Meals</button>
  </div>
);

const MealModal = ({ selectedDay, selectedGoal, onClose }) => {
  const meals = dietPlans[selectedGoal][selectedDay].meals;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-yellow-400">{selectedDay}</h2>
          <XCircle className="text-red-500 cursor-pointer" size={28} onClick={onClose} />
        </div>
        {meals.map((meal, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-yellow-400 font-semibold">{meal.category}</h3>
            <p className="text-gray-400">{meal.meal}</p>
            <p className="text-gray-500 text-sm">{meal.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DietPlans = () => {
  const [selectedGoal, setSelectedGoal] = useState("Bulking");
  const [selectedMealDay, setSelectedMealDay] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-yellow-400 text-3xl font-bold text-center mb-8">Diet Plans</header>

      <div className="mb-6 text-center">
        <label className="text-lg font-semibold mr-4">Select Goal:</label>
        <select
          className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-lg"
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          aria-label="Select diet goal"
        >
          {Object.keys(dietPlans).map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {Object.entries(dietPlans[selectedGoal]).map(([day]) => (
          <MealCard key={day} day={day} onClick={() => setSelectedMealDay(day)} />
        ))}
      </div>

      {selectedMealDay && (
        <MealModal
          selectedDay={selectedMealDay}
          selectedGoal={selectedGoal}
          onClose={() => setSelectedMealDay(null)}
        />
      )}
    </div>
  );
};

export default DietPlans;
