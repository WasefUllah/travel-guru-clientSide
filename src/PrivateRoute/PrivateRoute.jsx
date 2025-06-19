import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../Components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  

  const { user, loading } = use(AuthContext);
  if (loading) {
    return <Loader></Loader>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
