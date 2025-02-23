import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=pexels-victorfreitas-841130.jpg&fm=jpg')",
      }}
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent bg-opacity-80 p-4 z-50 shadow-md">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold uppercase tracking-wider text-yellow-400">
            FitTrack
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col flex-grow items-center justify-center text-center px-4 md:px-16">
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 whitespace-nowrap max-w-full mx-auto">
            TRACK. TRAIN. TRANSFORM.
          </h1>
          <p className="mt-4 sm:mt-6 text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-justify leading-relaxed">
            "At FITTRACK, we believe in the power of dedication and precision. Whether you're aiming to sculpt your body, enhance your performance, or reach new heights, our approach is simple: track your progress, train with purpose, and transform your results. With tailored workouts, data-driven insights, and unwavering support, we help you stay on track to achieve your goals and make lasting, meaningful changes. Join us in embracing a journey of growth and empowerment, where every step counts and every effort leads to transformation."
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="border-2 border-yellow-500 text-yellow-500 py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-yellow-500 text-yellow-500 py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-full bg-transparent hover:bg-yellow-500 hover:text-black transition duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative text-center text-gray-300 text-xs sm:text-sm md:text-base p-4">
        <p className="uppercase tracking-wide">Twitter | Facebook | Instagram</p>
      </footer>
    </div>
  );
};

export default LandingPage;
