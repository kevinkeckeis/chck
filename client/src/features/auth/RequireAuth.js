import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import React from "react";

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  // Prettier breaks down this row with () if width is set to 80%
  return token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
}

export default RequireAuth;
