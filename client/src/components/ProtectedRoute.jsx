import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check for multiple token types
  const studentToken = localStorage.getItem("studentToken");
  const teacherToken = localStorage.getItem("teacherToken");
  const adminToken = localStorage.getItem("token");

  // If none of the tokens are present, redirect to login page
  if (!studentToken && !teacherToken && !adminToken) {
    return <Navigate to="/student/login" />;
  }

  return children;
};

export default ProtectedRoute;
