import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkoutLogs = () => {
  const [workout, setWorkout] = useState({
    client: "",
    date: "",
    workoutType: "",
    exercises: [{ name: "", sets: "", reps: "" }],
  });
  const [clients, setClients] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [editId, setEditId] = useState(null);
  const trainerName = JSON.parse(localStorage.getItem("user"))?.name;

  useEffect(() => {
    fetchClients();
    fetchWorkouts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/trainers/clients/${trainerName}`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workouts");
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (index, e) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[index][e.target.name] = e.target.value;
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const addExercise = () => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { name: "", sets: "", reps: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/workouts/${editId}`, workout);
      } else {
        await axios.post("http://localhost:5000/api/workouts", workout);
      }
      fetchWorkouts();
      setWorkout({ client: "", date: "", workoutType: "", exercises: [{ name: "", sets: "", reps: "" }] });
      setEditId(null);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const handleEdit = (workout) => {
    setWorkout(workout);
    setEditId(workout._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workouts/${id}`);
      fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="text-yellow-400 text-2xl md:text-3xl font-bold text-center mb-6">Workout Log</header>
      <div className="max-w-lg mx-auto bg-gray-800 p-4 md:p-6 rounded-lg">
        <h2 className="text-xl md:text-2xl text-yellow-400 text-center mb-4">Log Workout</h2>
        <form onSubmit={handleSubmit}>
          <select name="client" value={workout.client} onChange={handleChange} required className="w-full p-2 mb-3 bg-gray-700 text-white">
            <option value="">Select Client</option>
            {clients.length > 0 ? clients.map((client) => (
              <option key={client._id} value={client._id}>{client.name}</option>
            )) : <option disabled>No Clients Found</option>}
          </select>
          <input type="date" name="date" value={workout.date} onChange={handleChange} required className="w-full p-2 mb-3 bg-gray-700 text-white" />
          <input type="text" name="workoutType" value={workout.workoutType} onChange={handleChange} required placeholder="Workout Type" className="w-full p-2 mb-3 bg-gray-700 text-white" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {workout.exercises.map((exercise, index) => (
              <React.Fragment key={index}>
                <input type="text" name="name" value={exercise.name} onChange={(e) => handleExerciseChange(index, e)} placeholder="Exercise Name" className="p-2 bg-gray-700 text-white" />
                <input type="number" name="sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, e)} placeholder="Sets" className="p-2 bg-gray-700 text-white" />
                <input type="number" name="reps" value={exercise.reps} onChange={(e) => handleExerciseChange(index, e)} placeholder="Reps" className="p-2 bg-gray-700 text-white" />
              </React.Fragment>
            ))}
          </div>
          <button type="button" onClick={addExercise} className="w-full bg-yellow-400 text-black py-2 mt-3">Add Exercise</button>
          <button type="submit" className="w-full bg-yellow-500 text-black py-2 mt-3">{editId ? "Update Workout" : "Log Workout"}</button>
        </form>
      </div>
      <div className="mt-6 max-w-full overflow-x-auto">
        <h2 className="text-xl md:text-2xl text-yellow-400 text-center mb-4">Workout List</h2>
        <table className="w-full text-white border border-gray-700">
          <thead>
            <tr className="bg-yellow-500 text-black">
              <th className="p-2">Client</th>
              <th className="p-2">Date</th>
              <th className="p-2">Workout Type</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.filter((w) => clients.some((c) => c._id === w.client?._id)).map((w) => (
              <tr key={w._id} className="border-b border-gray-700">
                <td className="p-2">{w.client?.name || "Unknown"}</td>
                <td className="p-2">{w.date}</td>
                <td className="p-2">{w.workoutType}</td>
                <td className="p-2 flex flex-col md:flex-row gap-2">
                  <button onClick={() => handleEdit(w)} className="bg-blue-500 px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(w._id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutLogs;