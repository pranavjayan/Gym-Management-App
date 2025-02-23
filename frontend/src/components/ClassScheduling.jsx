import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://gym-management-app-backend.onrender.com/api/classes";

const ClassScheduling = () => {
  const [classes, setClasses] = useState([]);
  const [classDetails, setClassDetails] = useState({
    name: "",
    instructor: "",
    time: "",
    date: "",
    description: "",
  });
  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(API_URL);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassDetails({ ...classDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!classDetails.name || !classDetails.instructor || !classDetails.time || !classDetails.date || !classDetails.description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingClassId) {
        await axios.put(`${API_URL}/${editingClassId}`, classDetails);
        alert("Class updated successfully!");
      } else {
        await axios.post(`${API_URL}/add`, classDetails);
        alert("Class added successfully!");
      }

      setClassDetails({ name: "", instructor: "", time: "", date: "", description: "" });
      setEditingClassId(null);
      fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
      alert("Failed to save class.");
    }
  };

  const handleEdit = (classItem) => {
    setClassDetails(classItem);
    setEditingClassId(classItem._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Class deleted successfully!");
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Failed to delete class.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white p-4">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
            {editingClassId ? "Edit Class Schedule" : "Add Class Schedule"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {['name', 'instructor', 'time', 'date', 'description'].map((field, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-semibold mb-1 capitalize">{field}</label>
                {field === "description" ? (
                  <textarea
                    name={field}
                    value={classDetails[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                  ></textarea>
                ) : (
                  <input
                    type={field === "time" ? "time" : field === "date" ? "date" : "text"}
                    name={field}
                    value={classDetails[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                  />
                )}
              </div>
            ))}
            <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500">
              {editingClassId ? "Update Class" : "Add Class"}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">Class Schedule</h2>
        <table className="w-full bg-gray-800 text-white rounded-lg min-w-max">
          <thead>
            <tr className="bg-yellow-500 text-black">
              {["Class Name", "Instructor", "Time", "Date", "Description", "Actions"].map((heading, index) => (
                <th key={index} className="p-3 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="border-b border-gray-700 text-sm">
                <td className="p-3">{classItem.name}</td>
                <td className="p-3">{classItem.instructor}</td>
                <td className="p-3">{classItem.time}</td>
                <td className="p-3">{classItem.date}</td>
                <td className="p-3 truncate max-w-xs">{classItem.description}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button onClick={() => handleEdit(classItem)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(classItem._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassScheduling;
