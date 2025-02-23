import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // Debugging line
  
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "trainer") navigate("/trainer/dashboard");
      else navigate("/client/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div
      className="h-screen flex items-center justify-between bg-cover bg-center px-10"
      style={{
        backgroundImage:
          "url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701970276.jpg')",
      }}
    >
      <div className="fixed top-0 left-0 p-4 text-xl md:text-2xl font-bold uppercase tracking-wider text-yellow-400">
        FitTrack
      </div>

      <div className="hidden md:flex flex-col justify-center items-start w-1/2 text-white">
        <h1 className="text-4xl font-bold leading-tight">
          "Push yourself, because no one else is going to do it for you."
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Stay consistent, stay focused, and achieve your goals.
        </p>
      </div>

      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full sm:w-[400px] md:w-[35%] lg:w-[30%]">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          LOGIN
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg font-bold hover:bg-yellow-500 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
