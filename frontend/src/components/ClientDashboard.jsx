import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell, Utensils, LineChart, Calendar, List } from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "client") {
      navigate("/login"); // Redirect if not a client
      return;
    }
    setClientName(userData.name);

    // Prevent Back Navigation
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
    <div className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      {/* Navbar */}
      <nav className="w-full bg-gray-900 bg-opacity-80 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center shadow-lg relative z-20">
        <h1 className="text-lg font-semibold">Welcome, {clientName || "Athlete"}! 🏋️‍♂️</h1>
        <div className="text-3xl font-extrabold text-yellow-400 tracking-wide uppercase">FITTRACK</div>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition-all font-semibold shadow-md"
        >
          Logout
        </button>
      </nav>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      {/* Content */}
      <div className="relative z-10 p-8 text-center">
        {/* Dashboard Header */}
        <header className="text-yellow-400 text-4xl font-bold drop-shadow-lg mb-4">
          Welcome Back, {clientName || "Champion"}! 
        </header>

        <p className="text-lg text-gray-300 italic mb-8 animate-slideIn">
          The only bad workout is the one you didn’t do. Crush your goals today! 
        </p>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/** Dashboard Items */}
          {[
            {
              icon: <Dumbbell size={50} className="text-yellow-400" />,
              title: "Workout Log",
              description: "Track your workouts and progress.",
              link: "/client/workouts",
            },
            {
              icon: <Utensils size={50} className="text-yellow-400" />,
              title: "Diet Plan",
              description: "Check your meal plans and nutrition guide.",
              link: "/client/diet",
            },
            // {
            //   icon: <LineChart size={50} className="text-yellow-400" />,
            //   title: "Progress Update",
            //   description: "Upload photos and track your fitness journey.",
            //   link: "/client/progress",
            // },
            {
              icon: <Calendar size={50} className="text-yellow-400" />,
              title: "Upcoming Classes",
              description: "Check your scheduled fitness classes.",
              link: "/client/classes",
            },
            {
              icon: <Dumbbell size={50} className="text-yellow-400" />,
              title: "Custom Workout Plan",
              description: "View your personalized workout plan.",
              link: "/client/custom-workout",
            },
            {
              icon: <List size={50} className="text-yellow-400" />,
              title: "Custom Diet Plan",
              description: "View your trainer-recommended diet plan.",
              link: "/client/custom-diet",
            },
          ].map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="bg-gray-800 p-6 rounded-lg text-center shadow-lg transition-all transform hover:scale-105 hover:shadow-xl hover:bg-gray-700 hover:rotate-1"
            >
              {item.icon}
              <h2 className="text-xl font-semibold mt-4 text-white">{item.title}</h2>
              <p className="text-gray-400 mt-2">{item.description}</p>
              <span className="text-yellow-400 mt-4 block font-semibold">Let’s Go →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
