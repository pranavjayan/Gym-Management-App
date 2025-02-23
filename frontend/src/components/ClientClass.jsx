import { useEffect, useState } from "react";

const ClientClass = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/classes");
      const data = await response.json();
      setClasses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
     

      {/* Page Header */}
      <header className="text-yellow-400 text-4xl font-bold text-center my-8">
        CLASS SCHEDULE
      </header>

      {/* Loading & Empty State */}
      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading classes...</p>
      ) : classes.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No classes scheduled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-gray-800 h-48 flex flex-col justify-center p-4 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-yellow-400">{cls.name}</h3>
              <p className="text-sm text-gray-300">Instructor: {cls.instructor}</p>
              <p className="text-sm text-gray-300">Time: {cls.time}</p>
              <p className="text-sm text-gray-300">Date: {new Date(cls.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-400 mt-2">{cls.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientClass;
