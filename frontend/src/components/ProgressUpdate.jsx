import React, { useState } from "react";
import { Camera, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const ProgressUpdate = () => {
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(""); // New state for insights/description
  const [progressPhotos, setProgressPhotos] = useState([]);

  // Handle the photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Display the photo after upload
    }
  };

  // Add progress to the list
  const handleAddProgress = () => {
    if (weight && photo && description) { // Ensure description is provided
      const newProgress = {
        id: progressPhotos.length + 1,
        weight,
        photo,
        description, // Add description to the progress data
        date: new Date().toLocaleDateString(),
      };
      setProgressPhotos([...progressPhotos, newProgress]);
      setWeight(""); // Reset weight input
      setPhoto(null); // Reset photo input
      setDescription(""); // Reset description input
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-yellow-400 text-3xl font-bold text-center mb-8">
        Progress Update
      </header>

      <div className="max-w-xl mx-auto">
        {/* Form to upload progress */}
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
            <input
              type="file"
              onChange={handlePhotoUpload}
              accept="image/*"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
            />
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
            <button
              onClick={handleAddProgress}
              className="bg-yellow-400 text-black py-2 px-4 rounded-lg"
            >
              Add Progress
            </button>
          </div>
        </div>

        {/* Display uploaded photos and weights */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 text-center mb-6">
            Progress Photos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {progressPhotos.map((progress) => (
              <div key={progress.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={progress.photo}
                  alt="Progress"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <p className="text-gray-300 font-semibold">Weight: {progress.weight} kg</p>
                  <p className="text-gray-400 text-sm">Date: {progress.date}</p>
                  <p className="text-gray-300 mt-2">{progress.description}</p> {/* Display description */}
                </div>
                {/* Icons for Tracking Weight Change */}
                <div className="flex justify-center space-x-4 mt-4">
                  <ArrowUpCircle className="text-green-500" size={24} />
                  <ArrowDownCircle className="text-red-500" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressUpdate;
