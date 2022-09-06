import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { RiDashboardLine } from "react-icons/ri";
import { BiHide } from "react-icons/bi";

import BoardModal from "../Modals/BoardModal";
import { useFetchBoards } from "../../hooks/api/board/useBoard";
import useStore from "../../store/useStore";

const Sidebar = ({ setShowSidebar, showSidebar }) => {
  const [showBoardModal, setShowBoardModal] = useState(false);
  const removeUser = useStore((state) => state.removeUser);

  const { data, isSuccess } = useFetchBoards();
  const boardsList = data?.data.data.boards;

  // bord list function
  const renderBoardsList = () => {
    if (!isSuccess) return;

    return boardsList.map((board) => {
      return (
        <li key={board._id}>
          <NavLink
            to={`/board/${board._id}`}
            className={({ isActive }) =>
              isActive
                ? "flex gap-3 items-center px-6 py-3 text-colorNeutral bg-colorpurple rounded-r-full"
                : "flex gap-3 items-center px-6 py-3 text-colorMediumGray "
            }
          >
            <RiDashboardLine className="h-5 w-5 " />
            <div className="text-base font-bold w-[90%] whitespace-nowrap overflow-hidden text-ellipsis">
              {board.name}
            </div>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <main
      className={`flex flex-col justify-between sidebar-h  bg-colorPrimaryLight
      border-r border-colorPrimaryLight2 pt-2 ut-animation relative  z-20  `}
    >
      {/* Section Top */}
      <section>
        <h3 className="uppercase font-bold text-colorMediumGray px-6 mb-6">
          {`all boards(${boardsList?.length})`}
        </h3>

        {/* boards list */}
        <ul className="flex flex-col gap-1 pr-6">{renderBoardsList()}</ul>

        {/* create board button */}
        <button
          onClick={() => setShowBoardModal(true)}
          className="flex gap-3 items-center text-colorpurple px-6 py-3"
        >
          <RiDashboardLine className="h-5 w-5 " />
          <div className="text-base font-bold ">+ Create New Board</div>
        </button>
      </section>

      {/* Section Bottom */}
      <section className="flex flex-col mb-7 pr-6">
        <button
          onClick={() => removeUser()}
          className="btn-primary w-full max-w-[6rem] self-center mb-5 text-sm"
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
      {showBoardModal && (
        <BoardModal isNew={true} setShowBoardModal={setShowBoardModal} />
      )}
    </main>
  );
};

export default Sidebar;
