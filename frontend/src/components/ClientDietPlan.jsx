import React, { useState } from "react";
import { ForkKnife, XCircle } from "lucide-react";

// South Indian High-Protein Diet Plan structure for each goal (Bulking, Cutting, and Maintenance)
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
    Wednesday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Chicken with Quinoa", details: "Grilled Chicken Breast, Quinoa, Steamed Vegetables" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Vegetable Curry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Indian Spices" },
      ],
    },
    Thursday: {
      meals: [
        { category: "Breakfast", meal: "Moong Dal Chilla with Paneer", details: "Moong dal, Cottage Cheese, Cucumber, and Tomato" },
        { category: "Lunch", meal: "Grilled Chicken Salad", details: "Grilled Chicken, Lettuce, Tomato, and Cucumber" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
    Friday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Tofu with Spinach Salad", details: "Grilled Tofu, Spinach, Lemon" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Vegetable Stir-fry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Soy Sauce" },
      ],
    },
    Saturday: {
      meals: [
        { category: "Breakfast", meal: "Idli with Sambar and Coconut Chutney", details: "Steamed Idli, Lentil Sambar, Coconut Chutney" },
        { category: "Lunch", meal: "Grilled Chicken with Brown Rice", details: "Grilled Chicken Breast, Brown Rice, Spinach" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
    Sunday: {
      meals: [
        { category: "Breakfast", meal: "Moong Dal Chilla with Paneer", details: "Moong dal, Cottage Cheese, Cucumber, and Tomato" },
        { category: "Lunch", meal: "Paneer Tikka with Paratha", details: "Grilled Paneer, Whole Wheat Paratha, Raita" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Vegetable Curry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Indian Spices" },
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
    Tuesday: {
      meals: [
        { category: "Breakfast", meal: "Idli with Sambar and Coconut Chutney", details: "Steamed Idli, Lentil Sambar, Coconut Chutney" },
        { category: "Lunch", meal: "Grilled Chicken with Brown Rice", details: "Grilled Chicken Breast, Brown Rice, Spinach" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Vegetable Stir-fry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Soy Sauce" },
      ],
    },
    Wednesday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Chicken with Quinoa", details: "Grilled Chicken Breast, Quinoa, Steamed Vegetables" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Grilled Fish with Salad", details: "Grilled Fish, Cucumber, Carrot, Lettuce" },
      ],
    },
    Thursday: {
      meals: [
        { category: "Breakfast", meal: "Moong Dal Chilla with Paneer", details: "Moong dal, Cottage Cheese, Cucumber, and Tomato" },
        { category: "Lunch", meal: "Grilled Chicken Salad", details: "Grilled Chicken, Lettuce, Tomato, and Cucumber" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Vegetable Curry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Indian Spices" },
      ],
    },
    Friday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Tofu with Spinach Salad", details: "Grilled Tofu, Spinach, Lemon" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
    Saturday: {
      meals: [
        { category: "Breakfast", meal: "Idli with Sambar and Coconut Chutney", details: "Steamed Idli, Lentil Sambar, Coconut Chutney" },
        { category: "Lunch", meal: "Grilled Chicken with Brown Rice", details: "Grilled Chicken Breast, Brown Rice, Spinach" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Vegetable Stir-fry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Soy Sauce" },
      ],
    },
    Sunday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Chicken with Quinoa", details: "Grilled Chicken Breast, Quinoa, Steamed Vegetables" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
  },
  Maintenance: {
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
        { category: "Breakfast", meal: "Scrambled Eggs with Whole Wheat Toast", details: "Eggs, Whole Wheat Bread, Spinach" },
        { category: "Lunch", meal: "Grilled Tofu with Spinach Salad", details: "Grilled Tofu, Spinach, Lemon" },
        { category: "Snack", meal: "Greek Yogurt with Nuts", details: "Greek Yogurt, Almonds, Walnuts" },
        { category: "Dinner", meal: "Vegetable Stir-fry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Soy Sauce" },
      ],
    },
    Wednesday: {
      meals: [
        { category: "Breakfast", meal: "Oats with Peanut Butter & Banana", details: "Oats, Peanut Butter, Banana, Chia Seeds" },
        { category: "Lunch", meal: "Grilled Chicken with Quinoa", details: "Grilled Chicken Breast, Quinoa, Steamed Vegetables" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Grilled Salmon with Roasted Vegetables", details: "Salmon, Zucchini, Bell Peppers, Olive Oil" },
      ],
    },
    Thursday: {
      meals: [
        { category: "Breakfast", meal: "Idli with Sambar and Coconut Chutney", details: "Steamed Idli, Lentil Sambar, Coconut Chutney" },
        { category: "Lunch", meal: "Grilled Chicken Salad", details: "Grilled Chicken, Lettuce, Tomato, Cucumber" },
        { category: "Snack", meal: "Peanut Butter & Apple Slices", details: "Apple Slices, Peanut Butter" },
        { category: "Dinner", meal: "Vegetable Curry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Indian Spices" },
      ],
    },
    Friday: {
      meals: [
        { category: "Breakfast", meal: "Oats Upma with Vegetables", details: "Oats, Mixed Vegetables, Turmeric, Mustard Seeds" },
        { category: "Lunch", meal: "Grilled Paneer with Brown Rice", details: "Grilled Paneer, Brown Rice, Spinach" },
        { category: "Snack", meal: "Masala Chana", details: "Boiled Chickpeas, Spices, and Lemon" },
        { category: "Dinner", meal: "Fish Curry with Quinoa", details: "Fish, Quinoa, Spices, and Coconut Milk" },
      ],
    },
    Saturday: {
      meals: [
        { category: "Breakfast", meal: "Banana Pancakes with Honey", details: "Banana, Whole Wheat Flour, Eggs, Honey" },
        { category: "Lunch", meal: "Grilled Chicken with Brown Rice", details: "Grilled Chicken Breast, Brown Rice, Spinach" },
        { category: "Snack", meal: "Puffed Rice with Peanuts", details: "Puffed Rice, Peanuts, and Spices" },
        { category: "Dinner", meal: "Vegetable Stir-fry with Brown Rice", details: "Mixed Vegetables, Brown Rice, Soy Sauce" },
      ],
    },
    Sunday: {
      meals: [
        { category: "Breakfast", meal: "Oats with Peanut Butter & Banana", details: "Oats, Peanut Butter, Banana, Chia Seeds" },
        { category: "Lunch", meal: "Grilled Chicken with Quinoa", details: "Grilled Chicken Breast, Quinoa, Steamed Vegetables" },
        { category: "Snack", meal: "Greek Yogurt with Nuts", details: "Greek Yogurt, Almonds, Walnuts" },
        { category: "Dinner", meal: "Grilled Fish with Salad", details: "Grilled Fish, Cucumber, Carrot, Lettuce" },
      ],
    },
  },
};

const DietPlans = () => {
  const [selectedGoal, setSelectedGoal] = useState("Bulking");  // Default to "Bulking"
  const [selectedDay, setSelectedDay] = useState(null);

  // Get the diet plan for the selected goal
  const dietPlan = dietPlans[selectedGoal];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-yellow-400 text-3xl font-bold text-center mb-8">
        Diet Plans
      </header>

      {/* Select Goal (Bulking, Cutting, Maintenance) */}
      <div className="mb-6 text-center">
        <label className="text-lg font-semibold mr-4">Select Goal:</label>
        <select
          className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-lg"
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
        >
          <option value="Bulking">Bulking</option>
          <option value="Cutting">Cutting</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Diet Plan Display for the selected goal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {dietPlan &&
          Object.entries(dietPlan).map(([day, { meals }]) => (
            <div
              key={day}
              className="bg-gray-800 p-6 rounded-lg text-center shadow-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setSelectedDay(day)}
            >
              <ForkKnife className="text-yellow-400 mx-auto" size={48} />
              <h2 className="text-xl font-semibold mt-4">{day}</h2>
              <button className="text-yellow-400 mt-2">View Meals</button>
            </div>
          ))}
      </div>

      {/* Meal Details Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-yellow-400">
                {selectedDay}
              </h2>
              <XCircle
                className="text-red-500 cursor-pointer"
                size={28}
                onClick={() => setSelectedDay(null)}
              />
            </div>

            {/* Display Meal Details */}
            <div>
              {dietPlan[selectedDay].meals.map((meal, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-yellow-400 font-semibold">{meal.category}</h3>
                  <p className="text-gray-400">{meal.meal}</p>
                  <p className="text-gray-500 text-sm">{meal.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlans;