import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { RiDashboardLine } from "react-icons/ri";
import { BiHide } from "react-icons/bi";

import { logout } from "../../redux/features/auth/authSlice";

const Sidebar = ({ setShowSidebar, showSidebar }) => {
  const dispatch = useDispatch();

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
          <li>
            <NavLink
              to="/board/123"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center px-6 py-3 text-colorNeutral bg-colorpurple rounded-r-full"
                  : "flex gap-3 items-center px-6 py-3 text-colorMediumGray "
              }
            >
              <RiDashboardLine className="h-5 w-5 " />
              <div className="text-base font-bold ">sdfsdfsdf</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/board/1234"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center px-6 py-3 text-colorNeutral bg-colorpurple rounded-r-full"
                  : "flex gap-3 items-center px-6 py-3 text-colorMediumGray "
              }
            >
              <RiDashboardLine className="h-5 w-5 " />
              <div className="text-base font-bold ">sdfsdfsdf</div>
            </NavLink>
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
      <section className="flex flex-col mb-7 pr-6">
        <button
          onClick={() => dispatch(logout())}
          className="btn-primary w-full max-w-[5rem] self-center mb-5"
        >
          Logout
        </button>
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          className="flex items-center gap-2 text-base text-colorMediumGray font-bold px-6 py-3 hover:bg-colorNeutral hover:text-colorpurple w-full
          rounded-r-full ut-animation"
        >
          <BiHide className="h-5 w-5" />
          <div>Hide Sidebar</div>
        </button>
      </section>
    </main>
  );
};

export default Sidebar;
