import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import HomePage from "../../pages/HomePage";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/" exact element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AnimatedRoutes;
