import React, { useState } from "react";

import { BsFillEyeFill } from "react-icons/bs";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const HomePage = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return <main className="bg-colorPrimary ">homepage</main>;
};

export default HomePage;
