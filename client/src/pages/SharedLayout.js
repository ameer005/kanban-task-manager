import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BsFillEyeFill } from "react-icons/bs";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

import { fetchAllBoards } from "../redux/features/board/boardSlice";

const SharedLayout = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  return (
    <main className="bg-colorPrimary">
      <Navbar showSidebar={showSidebar} />

      <section className="flex h-full ">
        <div className="lg:hidden">
          <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        </div>

        <Outlet />
      </section>

      {!showSidebar && (
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          className="flex justify-center fixed bottom-10 left-0 bg-colorpurple py-3 w-[3rem] rounded-r-full z-10
                  hover:bg-colorLightPurple ut-animation"
        >
          <BsFillEyeFill className="h-5 w-5 " />
        </button>
      )}
    </main>
  );
};

export default SharedLayout;
