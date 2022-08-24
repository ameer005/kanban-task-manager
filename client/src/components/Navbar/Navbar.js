import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { MdMoreVert } from "react-icons/md";
import logoDark from "../../assets/logo-light.svg";

import BoardModal from "../Modals/BoardModal";
import TaskModal from "../Modals/TaskModal";
import DeleteModal from "../Modals/DeleteModal";
import {
  deleteBoard,
  resetDeleteBoard,
  fetchAllBoards,
} from "../../redux/features/board/boardSlice";

const Navbar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();
  const menuBtnRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  // const [pathname, setPathName] = useState(window.location.pathname);
  const { id } = useParams();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.board.deleteBoard
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
        <h3 className="text-2xl  py-7 font-bold">{board?.name || "Board"}</h3>
      </section>

      {window.location.pathname !== "/" && (
        <section className="flex items-center gap-2 py-7">
          <button
            onClick={() => setShowTaskModal(true)}
            className="btn-primary px-4 text-sm"
          >
            + Add new task
          </button>

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
                className="absolute right-[1rem] text-sm -bottom-[6rem] bg-colorPrimaryLight w-[10rem] p-4 rounded-md shadow-ut"
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
    </main>
  );
};

export default Navbar;
