import React from "react";

import { MdMoreVert } from "react-icons/md";

import logoDark from "../../assets/logo-light.svg";

const Navbar = ({ showSidebar }) => {
  return (
    <main className="flex items-center px-7 justify-between  bg-colorPrimaryLight">
      <section className="flex gap-5 items-center">
        <div
          className={`border-r border-colorPrimaryLight2 py-7 ut-animation  ${
            showSidebar ? "pr-28" : "pr-8"
          }`}
        >
          <img src={logoDark} alt="logo" />
        </div>
        <h3 className="text-2xl  py-7 font-bold">Board</h3>
      </section>

      <section className="flex items-center gap-2 py-7">
        <button className="btn-primary px-4 text-sm">+ Add new task</button>
        <div className="cursor-pointer">
          <MdMoreVert className="text-3xl text-colorMediumGray " />
        </div>
      </section>
    </main>
  );
};

export default Navbar;
