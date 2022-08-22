import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AnimatedRoutes from "./components/Routes/AnimatedRoutes";
import { fetchAllBoards } from "./redux/features/board/boardSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, []);

  return (
    <main className=" text-colorNeutral text-xs">
      <AnimatedRoutes />
    </main>
  );
};

export default App;
