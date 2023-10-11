import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Loader from "./Loader";

function PrivateRoutes() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }
  if (!user || error) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
