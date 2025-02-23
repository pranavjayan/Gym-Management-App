import React, { useState, useEffect } from "react";
import axios from "axios";
import { Camera, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const ProgressUpdate = ({ userId }) => {
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [progressPhotos, setProgressPhotos] = useState([]);

  // Fetch progress from backend on component mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`https://gym-management-app-backend.onrender.com/api/progress/${userId}`);
        console.log("Fetched Progress Data:", response.data); // Debugging
        setProgressPhotos(response.data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [userId]);

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // Store the file object for upload
    }
  };

  // Add Progress to Backend
  const handleAddProgress = async () => {
    if (!weight || !photo || !description) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("weight", weight);
    formData.append("description", description);
    formData.append("photo", photo);

    console.log("Form Data:", { userId, weight, description, photo }); // Debugging

    try {
      const response = await axios.post("https://gym-management-app-backend.onrender.com/api/progress", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response from Backend:", response.data); // Debugging
      setProgressPhotos([...progressPhotos, response.data]);
      setWeight("");
      setPhoto(null);
      setDescription("");
    } catch (error) {
      console.error("Error adding progress:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-yellow-400 text-3xl font-bold text-center mb-8">
        Progress Update
      </header>

      <div className="max-w-xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="text-lg font-semibold text-center mb-4">Update Your Progress</div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300">Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300">Upload Photo:</label>
            <input type="file" onChange={handlePhotoUpload} accept="image/*" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300">Add Insights/Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write any insights or notes about your progress"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg h-32"
            />
          </div>

          <div className="text-center">
            <button onClick={handleAddProgress} className="bg-yellow-400 text-black py-2 px-4 rounded-lg">
              Add Progress
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-yellow-400 text-center mb-6">Progress Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {progressPhotos.map((progress) => (
            <div key={progress._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src={`http://localhost:5000/${progress.photo}`} alt="Progress" className="w-full h-48 object-cover rounded-lg mb-4" />
              <div className="text-center">
                <p className="text-gray-300 font-semibold">Weight: {progress.weight} kg</p>
                <p className="text-gray-400 text-sm">Date: {new Date(progress.date).toLocaleDateString()}</p>
                <p className="text-gray-300 mt-2">{progress.description}</p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <ArrowUpCircle className="text-green-500" size={24} />
                <ArrowDownCircle className="text-red-500" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdate;
