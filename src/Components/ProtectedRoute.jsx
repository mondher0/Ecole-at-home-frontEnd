/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Navigate, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
