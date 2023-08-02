/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminLoginProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/admin/board" />;
  }
  return children;
};

export default AdminLoginProtectedRoute;
