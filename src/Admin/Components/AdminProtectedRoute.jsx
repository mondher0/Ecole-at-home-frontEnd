/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default AdminProtectedRoute;
