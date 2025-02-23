import React, { useState } from "react";
import { CheckCircle, Dumbbell, Plus, XCircle } from "lucide-react";

const workoutSplits = {
  "Push/Pull/Legs": {
    Monday: {
      workout: [
        { category: "Chest", exercises: ["Incline Bench Press", "Flat Bench Press", "Dumbbell Flies"] },
        { category: "Triceps", exercises: ["Rope Pushdown", "Tricep Dips", "Overhead Tricep Extension"] },
        { category: "Shoulders", exercises: ["Overhead Press", "Lateral Raise", "Arnold Press"] },
      ],
    },
    Tuesday: {
      workout: [
        { category: "Back", exercises: ["Deadlift", "Pull-ups", "Bent-over Rows"] },
        { category: "Biceps", exercises: ["Barbell Curl", "Hammer Curl", "Preacher Curl"] },
        { category: "Shoulders", exercises: ["Face Pull", "Shrugs"] },
      ],
    },
    Wednesday: {
      workout: [
        { category: "Legs", exercises: ["Squats", "Leg Press", "Lunges"] },
        { category: "Abs", exercises: ["Crunches", "Leg Raises", "Planks"] },
      ],
    },
    Thursday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
    Friday: {
      workout: [
        { category: "Chest", exercises: ["Bench Press", "Chest Fly", "Push-ups"] },
        { category: "Triceps", exercises: ["Skull Crushers", "Tricep Kickbacks", "Dips"] },
        { category: "Shoulders", exercises: ["Front Raise", "Lateral Raise", "Shrugs"] },
      ],
    },
    Saturday: {
      workout: [
        { category: "Back", exercises: ["Lat Pulldown", "Barbell Row", "Seated Row"] },
        { category: "Biceps", exercises: ["Incline Dumbbell Curl", "Concentration Curl", "EZ Bar Curl"] },
      ],
    },
    Sunday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
  },

  "Upper/Lower Split": {
    Monday: {
      workout: [
        { category: "Chest", exercises: ["Bench Press", "Dumbbell Fly", "Push-ups"] },
        { category: "Back", exercises: ["Pull-ups", "Bent-over Rows", "Lat Pulldown"] },
        { category: "Shoulders", exercises: ["Overhead Press", "Lateral Raise", "Front Raise"] },
      ],
    },
    Tuesday: {
      workout: [
        { category: "Legs", exercises: ["Squats", "Leg Press", "Lunges"] },
        { category: "Abs", exercises: ["Leg Raises", "Crunches", "Plank"] },
      ],
    },
    Wednesday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
    Thursday: {
      workout: [
        { category: "Chest", exercises: ["Incline Bench Press", "Chest Fly", "Cable Chest Press"] },
        { category: "Back", exercises: ["Barbell Row", "Seated Row", "Dumbbell Pullover"] },
        { category: "Shoulders", exercises: ["Arnold Press", "Upright Row", "Shrugs"] },
      ],
    },
    Friday: {
      workout: [
        { category: "Legs", exercises: ["Deadlift", "Bulgarian Split Squat", "Hamstring Curl"] },
        { category: "Abs", exercises: ["Russian Twists", "Mountain Climbers", "Leg Raises"] },
      ],
    },
    Saturday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
    Sunday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
  },

  "Push/Pull/Legs (Advanced)": {
    Monday: {
      workout: [
        { category: "Chest", exercises: ["Incline Bench Press", "Flat Bench Press", "Chest Dips"] },
        { category: "Triceps", exercises: ["Overhead Tricep Extension", "Rope Pushdown", "Skull Crushers"] },
        { category: "Shoulders", exercises: ["Overhead Press", "Dumbbell Lateral Raise", "Face Pull"] },
      ],
    },
    Tuesday: {
      workout: [
        { category: "Back", exercises: ["Deadlift", "Pull-ups", "Bent-over Barbell Row"] },
        { category: "Biceps", exercises: ["Barbell Curl", "Hammer Curl", "Preacher Curl"] },
        { category: "Shoulders", exercises: ["Dumbbell Shrugs", "Reverse Fly"] },
      ],
    },
    Wednesday: {
      workout: [
        { category: "Legs", exercises: ["Squats", "Front Squats", "Lunges"] },
        { category: "Abs", exercises: ["Russian Twists", "Leg Raises", "Planks"] },
      ],
    },
    Thursday: {
      workout: [
        { category: "Chest", exercises: ["Flat Bench Press", "Chest Fly", "Incline Dumbbell Press"] },
        { category: "Triceps", exercises: ["Tricep Kickbacks", "Close-Grip Bench Press", "Dips"] },
        { category: "Shoulders", exercises: ["Arnold Press", "Dumbbell Lateral Raise"] },
      ],
    },
    Friday: {
      workout: [
        { category: "Back", exercises: ["T-Bar Row", "Lat Pulldown", "Cable Row"] },
        { category: "Biceps", exercises: ["EZ Bar Curl", "Concentration Curl", "Spider Curl"] },
        { category: "Shoulders", exercises: ["Dumbbell Lateral Raise", "Front Raise", "Shrugs"] },
      ],
    },
    Saturday: {
      workout: [
        { category: "Legs", exercises: ["Deadlifts", "Leg Press", "Leg Extensions"] },
        { category: "Abs", exercises: ["Cable Crunches", "V-ups", "Leg Raises"] },
      ],
    },
    Sunday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
  },

  "Body Part Split": {
    Monday: {
      workout: [
        { category: "Chest", exercises: ["Flat Bench Press", "Chest Fly", "Dumbbell Bench Press"] },
        { category: "Triceps", exercises: ["Tricep Pushdowns", "Skull Crushers", "Dips"] },
      ],
    },
    Tuesday: {
      workout: [
        { category: "Back", exercises: ["Pull-ups", "Barbell Row", "Lat Pulldown"] },
        { category: "Biceps", exercises: ["Barbell Curl", "Hammer Curl", "Preacher Curl"] },
      ],
    },
    Wednesday: {
      workout: [
        { category: "Shoulders", exercises: ["Overhead Press", "Lateral Raise", "Arnold Press"] },
        { category: "Abs", exercises: ["Crunches", "Leg Raises", "Plank"] },
      ],
    },
    Thursday: {
      workout: [
        { category: "Legs", exercises: ["Squats", "Leg Press", "Lunges"] },
        { category: "Abs", exercises: ["Russian Twists", "Mountain Climbers", "Planks"] },
      ],
    },
    Friday: {
      workout: [
        { category: "Chest", exercises: ["Incline Bench Press", "Dumbbell Fly", "Chest Press"] },
        { category: "Triceps", exercises: ["Overhead Tricep Extension", "Tricep Dips"] },
      ],
    },
    Saturday: {
      workout: [
        { category: "Back", exercises: ["T-Bar Row", "Dumbbell Pullover", "Lat Pulldown"] },
        { category: "Biceps", exercises: ["Incline Dumbbell Curl", "EZ Bar Curl", "Concentration Curl"] },
      ],
    },
    Sunday: {
      workout: [
        { category: "Rest", exercises: [] },
      ],
    },
  },
};

const ClientWorkoutLog = () => {
  const [selectedSplit, setSelectedSplit] = useState("Push/Pull/Legs");
  const [selectedDay, setSelectedDay] = useState(null);

  // Check if the selectedSplit exists in workoutSplits
  const workoutSplit = workoutSplits[selectedSplit];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-yellow-400 text-3xl font-bold text-center mb-8">
        Workout Splits
      </header>

      {/* Select Workout Split */}
      <div className="mb-6 text-center">
        <label className="text-lg font-semibold mr-4">Select a Workout Split:</label>
        <select
          className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-lg"
          value={selectedSplit}
          onChange={(e) => setSelectedSplit(e.target.value)}
        >
          {Object.keys(workoutSplits).map((split) => (
            <option key={split} value={split}>
              {split}
            </option>
          ))}
        </select>
      </div>

      {/* Workout Plan Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Only display if workoutSplit exists */}
        {workoutSplit &&
          Object.entries(workoutSplit).map(([day, { workout }]) => (
            <div
              key={day}
              className="bg-gray-800 p-6 rounded-lg text-center shadow-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setSelectedDay(day)}
            >
              <Dumbbell className="text-yellow-400 mx-auto" size={48} />
              <h2 className="text-xl font-semibold mt-4">{day}</h2>
              <button className="text-yellow-400 mt-2">View Workouts</button>
            </div>
          ))}
      </div>

      {/* Workout Details Modal */}
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

            {/* Display Workout Details */}
            <div>
              {workoutSplit[selectedDay].workout.map((category, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-yellow-400 font-semibold">{category.category}</h3>
                  <ul className="list-disc pl-5">
                    {category.exercises.length === 0 ? (
                      <li>No exercises for today</li>
                    ) : (
                      category.exercises.map((exercise, index) => (
                        <li key={index} className="text-gray-400">{exercise} - 3 sets of 15 reps</li>
                      ))
                    )}
                  </ul>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              className="mt-4 px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg"
              onClick={() => setSelectedDay(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientWorkoutLog;
