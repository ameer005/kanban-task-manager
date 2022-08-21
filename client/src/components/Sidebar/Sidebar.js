import React from "react";

import { RiDashboardLine } from "react-icons/ri";
import { BiHide } from "react-icons/bi";

const Sidebar = ({ setShowSidebar, showSidebar }) => {
  return (
    <main
      className={`flex flex-col justify-between sidebar-h w-full max-w-[18.5rem] bg-colorPrimaryLight
      border-r border-colorPrimaryLight2 pt-2 ut-animation relative  z-20  ${
        !showSidebar && "-ml-[18.5rem]"
      }`}
    >
      {/* Section Top */}
      <section>
        <h3 className="uppercase font-bold text-colorMediumGray px-6 mb-6">
          all boards(2)
        </h3>

        {/* boards */}
        <ul className="flex flex-col gap-1 pr-6  ">
          {/* normal board list */}
          <li className="flex gap-3 items-center text-colorMediumGray px-6 py-3">
            <RiDashboardLine className="h-5 w-5 " />
            <div className="text-base font-bold ">sdfsdfsdf</div>
          </li>
          <li
            className={`flex gap-3 items-center px-6 py-3 ${
              true
                ? "text-colorNeutral bg-colorpurple rounded-r-full"
                : "text-colorMediumGray "
            }`}
          >
            <RiDashboardLine className="h-5 w-5 " />
            <div className="text-base font-bold ">sdfsdfsdf</div>
          </li>

          {/* create board button */}
          <li className=" text-colorpurple px-6 py-3">
            <button className="flex gap-3 items-center">
              <RiDashboardLine className="h-5 w-5 " />
              <div className="text-base font-bold ">+ Create New Board</div>
            </button>
          </li>
        </ul>
      </section>

      {/* Section Bottom */}
      <section className="mb-10 px-6">
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          className="flex items-center gap-2 text-base text-colorMediumGray font-bold"
        >
          <BiHide className="h-5 w-5" />
          <div>Hide Sidebar</div>
        </button>
      </section>
    </main>
  );
};

export default Sidebar;
