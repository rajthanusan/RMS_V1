import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");


  if (!authToken || userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
