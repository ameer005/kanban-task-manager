import React, { useState } from "react";

import { BsFillEyeFill } from "react-icons/bs";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const HomePage = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <main className="bg-colorPrimary min-h-screen">
      <header>
        <Navbar showSidebar={showSidebar} />
      </header>

      <section className="flex h-full ">
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

        <div>yo</div>
      </section>

      {!showSidebar && (
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          className="flex justify-center fixed bottom-10 left-0 bg-colorpurple py-3 w-[3rem] rounded-r-full z-10"
        >
          <BsFillEyeFill className="h-5 w-5 " />
        </button>
      )}
    </main>
  );
};

export default HomePage;
