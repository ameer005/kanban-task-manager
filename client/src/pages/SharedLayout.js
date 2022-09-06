import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const SharedLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <main className="bg-colorPrimary">
      <Navbar showSidebar={showSidebar} />

      <section className="flex h-full ">
        <div
          className={`lg:hidden w-full max-w-[18.5rem] ${
            !showSidebar && "-ml-[18.5rem]"
          } ut-animation`}
        >
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
