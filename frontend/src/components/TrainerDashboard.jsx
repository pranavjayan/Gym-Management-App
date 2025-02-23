import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Dumbbell, Clipboard, BarChart2, LogOut } from "lucide-react";

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const trainerName = JSON.parse(localStorage.getItem("user"))?.name || "Trainer"; // Get trainer's name

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "trainer") {
      navigate("/login"); // Redirect if not a trainer
      return;
    }

    // Prevent Back Navigation
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    preventBack(); // Call initially
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-md fixed top-0 left-0 z-20 border-b border-gray-700"
      >
        <h1 className="text-xl font-semibold animate-pulse">Welcome, {trainerName}!</h1>
        <div className="text-2xl font-bold text-yellow-400 tracking-wide drop-shadow-lg">
          FITTRACK
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2 shadow-lg hover:scale-105"
        >
          <LogOut size={18} />
          Logout
        </button>
      </motion.nav>

      {/* Spacing to prevent content from being hidden behind the navbar */}
      <div className="h-20"></div>

      {/* Dashboard Header */}
      <motion.header
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-yellow-400 text-4xl font-bold text-center mb-8 mt-4"
      >
        {trainerName.toUpperCase()}'S DASHBOARD
      </motion.header>

      {/* Grid Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-8"
      >
        {/* Dashboard Options */}
        {[
          { to: "/trainer/clients", icon: <User size={56} />, label: "Client Management" },
          { to: "/trainer/workouts", icon: <Dumbbell size={56} />, label: "Give Custom Workout" },
          { to: "/trainer/diet-plans", icon: <Clipboard size={56} />, label: "Give Custom Diet" },
          // { to: "/trainer/progress", icon: <BarChart2 size={56} />, label: "Track Progress" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Link
              to={item.to}
              className="bg-gray-800 h-48 flex flex-col justify-center items-center rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className="text-yellow-400">{item.icon}</div>
              <h2 className="text-xl font-semibold mt-4">{item.label}</h2>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrainerDashboard;
