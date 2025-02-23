import React, { useState } from "react";

const workoutSplits = {
  "Push-Pull-Legs": {
    Monday: {
      Chest: ["Flat Bench Press", "Incline Dumbbell Press", "Chest Fly"],
      Triceps: ["Tricep Dips", "Skull Crushers", "Tricep Pushdown"],
      Shoulders: ["Overhead Press", "Lateral Raises", "Face Pulls"],
    },
    Tuesday: {
      Back: ["Pull-Ups", "Barbell Rows", "Lat Pulldown"],
      Biceps: ["Barbell Curls", "Hammer Curls", "Preacher Curls"],
    },
    Wednesday: {
      Legs: ["Squats", "Leg Press", "Calf Raises"],
      Abs: ["Plank", "Crunches", "Leg Raises"],
    },
    Thursday: "Rest Day",
    Friday: {
      Chest: ["Incline Bench Press", "Dips", "Cable Flys"],
      Triceps: ["Close-Grip Bench Press", "Overhead Extensions"],
      Shoulders: ["Arnold Press", "Front Raises"],
    },
    Saturday: {
      Back: ["Deadlifts", "Pull Downs", "One-Arm Rows"],
      Biceps: ["Concentration Curls", "EZ Bar Curls"],
    },
    Sunday: "Rest Day",
  },

  "Bro Split": {
    Monday: { Chest: ["Flat Bench Press", "Cable Flys", "Dips"] },
    Tuesday: { Back: ["Deadlifts", "Pull-Ups", "Bent-over Rows"] },
    Wednesday: { Shoulders: ["Military Press", "Face Pulls", "Rear Delt Fly"] },
    Thursday: { Arms: ["Bicep Curls", "Hammer Curls", "Tricep Dips"] },
    Friday: { Legs: ["Squats", "Leg Extensions", "Calf Raises"] },
    Saturday: "Rest Day",
    Sunday: "Rest Day",
  },

  "Full Body": {
    Monday: {
      Chest: ["Push-Ups", "Incline Dumbbell Press"],
      Back: ["Lat Pulldown", "Deadlifts"],
      Legs: ["Squats", "Lunges"],
      Arms: ["Bicep Curls", "Tricep Dips"],
    },
    Tuesday: "Rest Day",
    Wednesday: {
      Chest: ["Dumbbell Fly", "Cable Cross"],
      Back: ["Pull-Ups", "Seated Row"],
      Legs: ["Leg Press", "Calf Raises"],
      Arms: ["Close-Grip Bench Press", "Hammer Curls"],
    },
    Thursday: "Rest Day",
    Friday: {
      Chest: ["Bench Press", "Dips"],
      Back: ["Deadlifts", "Bent-over Rows"],
      Legs: ["Squats", "Step-Ups"],
      Arms: ["Preacher Curls", "Overhead Triceps Extension"],
    },
    Saturday: "Active Recovery (Stretching, Light Cardio)",
    Sunday: "Rest Day",
  },

  "Upper-Lower": {
    Monday: {
      Upper: [
        "Bench Press",
        "Overhead Press",
        "Pull-Ups",
        "Barbell Rows",
        "Bicep Curls",
        "Triceps Extensions",
      ],
    },
    Tuesday: {
      Lower: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
    },
    Wednesday: "Rest Day",
    Thursday: {
      Upper: [
        "Incline Dumbbell Press",
        "Dumbbell Shoulder Press",
        "Chin-Ups",
        "Face Pulls",
        "Hammer Curls",
        "Tricep Dips",
      ],
    },
    Friday: {
      Lower: ["Deadlifts", "Bulgarian Split Squats", "Seated Calf Raise"],
    },
    Saturday: "Active Recovery (Stretching, Yoga)",
    Sunday: "Rest Day",
  },
};

const WorkoutSplit = () => {
  const [selectedSplit, setSelectedSplit] = useState("Push-Pull-Legs");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        Select Your Workout Split
      </h2>

      {/* Dropdown Selection */}
      <div className="flex justify-center mb-6">
        <select
          className="p-3 bg-gray-800 border border-yellow-400 rounded-md text-lg"
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

      {/* Display Workouts */}
      <div className="max-w-4xl mx-auto">
        {Object.entries(workoutSplits[selectedSplit]).map(([day, muscles]) => (
          <div key={day} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400">{day}</h3>
            {/* Handle Rest Days & Strings */}
            {typeof muscles === "string" ? (
              <p className="text-gray-300">{muscles}</p>
            ) : (
              Object.entries(muscles).map(([muscleGroup, exercises]) => (
                <p key={muscleGroup} className="text-gray-300">
                  <strong className="text-white">{muscleGroup}:</strong>{" "}
                  {Array.isArray(exercises) ? exercises.join(", ") : "No exercises available"}
                </p>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSplit;
