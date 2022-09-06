import React from "react";
import useStore from "../../store/useStore";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = useStore((state) => state.user);

  return user ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
