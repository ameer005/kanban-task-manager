import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiDashboardLine } from "react-icons/ri";

import {
  MdMoreVert,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import logoDark from "../../assets/logo-light.svg";
import logoMobile from "../../assets/logo-mobile.svg";

import BoardModal from "../Modals/BoardModal";
import TaskModal from "../Modals/TaskModal";
import DeleteModal from "../Modals/DeleteModal";
import {
  deleteBoard,
  resetDeleteBoard,
  fetchAllBoards,
} from "../../redux/features/board/boardSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();
  const menuBtnRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileCreateBoard, setShowMobileCreateBoard] = useState(false);

  const { id } = useParams();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.board.deleteBoard
  );
  const { boardsList, isSuccess: boardListSuccess } = useSelector(
    (state) => state.board.fetchAllBoards
  );

  const board = useSelector((state) =>
    state.board.fetchAllBoards.boardsList.find((el) => el._id === id)
  );

  useEffect(() => {
    const handler = (e) => {
      if (
        showDropdown &&
        !menuRef.current.contains(e.target) &&
        !menuBtnRef.current.contains(e.target)
      )
        setShowDropdown(false);
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetDeleteBoard());
      dispatch(fetchAllBoards());
      navigate("/");
    }
  }, [isSuccess, isError, message]);

  // bord list function for mobile sidebar
  const renderBoardsList = () => {
    if (!boardListSuccess) return;

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
    <main className="flex items-center px-7 md:px-5 justify-between  bg-colorPrimaryLight">
      <section className="flex gap-5 md:gap-3 items-center">
        <div
          className={`border-r border-colorPrimaryLight2 py-7 ut-animation  ${
            showSidebar ? "pr-28" : "pr-8"
          } lg:hidden`}
        >
          <img className="xl:w-[7rem]" src={logoDark} alt="logo" />
        </div>

        <div className="hidden lg:block">
          <img className="md:w-[1.6rem]" src={logoMobile} alt="" />
        </div>

        {/* mobile dropdown sidbar */}
        <div
          onClick={() => setShowMobileSidebar((prev) => !prev)}
          className="flex items-center gap-2 lg:cursor-pointer relative"
        >
          <div className="max-w-[15rem] lg:max-w-[10rem] md:max-w-[8rem]">
            <h3 className="text-2xl xl:text-xl md:text-lg  py-7 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {board?.name || "Board"}
            </h3>
          </div>
          <div className="hidden lg:block text-colorpurple">
            {showMobileSidebar && (
              <MdOutlineKeyboardArrowUp className="text-xl" />
            )}
            {!showMobileSidebar && (
              <MdOutlineKeyboardArrowDown className="text-xl" />
            )}
          </div>

          {/* mobile nav bar */}
          {showMobileSidebar && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileSidebar(false);
              }}
              className="fixed top-0 left-0 right-0 bottom-0 bg-black/40  z-30  items-center justify-center hidden lg:flex"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-colorPrimaryLight text-colorNeutral w-full max-w-[23rem] py-6 rounded-lg modal-height modal-margin"
              >
                <section className="mb-4">
                  <h3 className="uppercase text-sm font-bold text-colorMediumGray px-6 mb-5">
                    all boards(2)
                  </h3>

                  {/* boards list */}
                  <ul className="flex flex-col gap-1 pr-6">
                    {renderBoardsList()}
                  </ul>

                  {/* create board button */}
                  <button
                    onClick={() => {
                      setShowMobileSidebar(false);
                      setShowMobileCreateBoard(true);
                    }}
                    className="flex gap-3 items-center text-colorpurple px-6 py-3"
                  >
                    <RiDashboardLine className="h-5 w-5 " />
                    <div className="text-base font-bold ">
                      + Create New Board
                    </div>
                  </button>
                </section>

                {/* Section Bottom */}
                <section className="flex justify-center items-center pr-6">
                  <button
                    onClick={() => dispatch(logout())}
                    className="btn-primary w-full max-w-[6rem] self-center text-sm"
                  >
                    Logout
                  </button>
                </section>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* right side of navbar */}
      {window.location.pathname !== "/" && (
        <section className="flex items-center gap-2 md:gap-1 py-7">
          {board.columns.length !== 0 && (
            <button
              onClick={() => setShowTaskModal(true)}
              className="btn-primary px-4 text-sm lg:text-base lg:py-1"
            >
              + <span className="lg:hidden">Add new task</span>
            </button>
          )}

          <div className="cursor-pointer relative">
            <div
              ref={menuBtnRef}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <MdMoreVert className="text-3xl text-colorMediumGray " />
            </div>

            {showDropdown && (
              <div
                ref={menuRef}
                className="absolute right-[1rem] text-sm -bottom-[6rem] bg-colorPrimaryLight w-[10rem] p-4 rounded-md shadow-ut z-20"
              >
                <button
                  onClick={() => setShowBoardModal(true)}
                  className="text-colorMediumGray  font-medium mb-3"
                >
                  Edit Board
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-colorRed  font-medium"
                >
                  Delete Board
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {showDeleteModal && (
        <DeleteModal
          action={deleteBoard}
          id={id}
          heading="Board"
          setShowDeleteModal={setShowDeleteModal}
          isLoading={isLoading}
        />
      )}
      {showBoardModal && (
        <BoardModal
          isNew={false}
          setShowBoardModal={setShowBoardModal}
          board={board}
        />
      )}
      {showTaskModal && (
        <TaskModal isNew={true} setShowTaskModal={setShowTaskModal} />
      )}
      {showMobileCreateBoard && (
        <BoardModal isNew={true} setShowBoardModal={setShowMobileCreateBoard} />
      )}
    </main>
  );
};

export default Navbar;
