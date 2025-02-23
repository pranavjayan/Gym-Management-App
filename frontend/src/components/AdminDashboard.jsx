import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Dumbbell, Calendar, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "admin") {
      navigate("/login");
      return;
    }

    setAdminName(userData.name);

    // Continuously push a new history state
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Call it initially
    preventBack();

    // Attach event listener to prevent going back
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg text-white py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-800 fixed top-0 left-0 z-50"
      >
        <h1 className="text-xl font-semibold">Welcome, {adminName || "Admin"}!</h1>
        <div className="text-3xl font-extrabold text-yellow-400 tracking-wide">FITTRACK</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-300 shadow-md flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Dashboard Header */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-yellow-400 text-4xl font-bold text-center my-8 drop-shadow-lg"
      >
        ADMIN DASHBOARD
      </motion.header>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-6">
        {[ 
          { to: "/admin/members", icon: <User size={64} />, label: "Member Management" },
          { to: "/admin/trainers", icon: <Dumbbell size={64} />, label: "Trainer Management" },
          { to: "/admin/schedule", icon: <Calendar size={64} />, label: "Class Scheduling" }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Link
              to={item.to}
              className="group bg-gray-800 h-48 flex flex-col justify-center items-center rounded-xl shadow-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <motion.div className="text-yellow-400 group-hover:rotate-12 transition-all duration-500">
                {item.icon}
              </motion.div>
              <h2 className="text-2xl font-semibold mt-4 tracking-wide">{item.label}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
