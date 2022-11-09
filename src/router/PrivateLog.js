import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateLog({ children }) {
  const location = useLocation();
  if (localStorage.getItem("role")) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default PrivateLog;