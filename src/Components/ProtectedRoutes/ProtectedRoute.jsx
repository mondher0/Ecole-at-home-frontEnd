/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
