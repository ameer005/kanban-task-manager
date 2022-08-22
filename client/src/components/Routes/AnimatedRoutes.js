import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import HomePage from "../../pages/HomePage";
import SharedLayout from "../../pages/SharedLayout";
import Board from "../../pages/Board";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <SharedLayout />
          </ProtectedRoutes>
        }
      >
        <Route index exact element={<HomePage />} />
        <Route path="board/:id" exact element={<Board />} />
      </Route>
    </Routes>
  );
};

export default AnimatedRoutes;
