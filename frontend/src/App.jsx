import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Programs from './components/Programs';
import Gallery from './components/Gallary';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUS';
import AdminDashboard from './components/AdminDashboard';
import MemberManagement from './components/MemberManagement';
import Trainers from './components/Trainers';
import ClassScheduling from './components/ClassScheduling';
import TrainerDashboard from './components/TrainerDashboard';
import WorkoutLogs from './components/WorkoutLogs';
import ProgressTracking from './components/ProgressTracking';
import ClientDashboard from './components/ClientDashboard';
import ClientWorkoutLog from './components/ClientWorkoutLog';
import ClientDietPlan from './components/ClientDietPlan';
import ProgressUpdate from './components/ProgressUpdate';
import ClientClass from './components/ClientClass';
import WorkoutSplit from './components/WorkoutSplit'
import TrainerClients from './components/TrainerClients';
import CustomDietLog from './components/CustomDietLog'
import ClientWorkoutDisplay from './components/ClientWorkoutDisplay';
import ClientDietDisplay from './components/ClientDietDisplay';

// Function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, false otherwise
};

// Function to get the user's role
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div>
            <LandingPage />
            <Programs />
            <Gallery />
            <AboutUs />
            <ContactUs />
            
           
          </div>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
        <Route path="/admin/members" element={<ProtectedRoute element={<MemberManagement />} allowedRoles={['admin']} />} />
        <Route path="/admin/trainers" element={<ProtectedRoute element={<Trainers />} allowedRoles={['admin']} />} />
        <Route path="/admin/schedule" element={<ProtectedRoute element={<ClassScheduling />} allowedRoles={['admin']} />} />

        {/* Trainer Routes */}
        <Route path="/trainer/dashboard" element={<ProtectedRoute element={<TrainerDashboard />} allowedRoles={['trainer']} />} />
        <Route path="/trainer/workouts" element={<ProtectedRoute element={<WorkoutLogs />} allowedRoles={['trainer']} />} />
        <Route path="/trainer/progress-tracking" element={<ProtectedRoute element={<ProgressTracking />} allowedRoles={['trainer']} />} />
        <Route path="/trainer/clients" element={<ProtectedRoute element={<TrainerClients />} allowedRoles={['trainer']} />} />
        <Route path="/trainer/diet-plans" element={<ProtectedRoute element={<CustomDietLog />} allowedRoles={['trainer']} />} />


        {/* Client Routes */}
        <Route path="/client/dashboard" element={<ProtectedRoute element={<ClientDashboard />} allowedRoles={['client']} />} />
        <Route path="/client/workouts" element={<ProtectedRoute element={<ClientWorkoutLog />} allowedRoles={['client']} />} />
        <Route path="/client/diet" element={<ProtectedRoute element={<ClientDietPlan />} allowedRoles={['client']} />} />
        <Route path="/client/progress" element={<ProtectedRoute element={<ProgressUpdate />} allowedRoles={['client']} />} />
        <Route path="/client/classes" element={<ProtectedRoute element={<ClientClass />} allowedRoles={['client']} />} />
        <Route path="/client/custom-workout" element={<ProtectedRoute element={<ClientWorkoutDisplay />} allowedRoles={['client']} />} />
        <Route path="/client/custom-diet" element={<ProtectedRoute element={<ClientDietDisplay />} allowedRoles={['client']} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
