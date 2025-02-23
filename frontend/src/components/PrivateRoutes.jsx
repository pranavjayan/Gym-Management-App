import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
