import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { MdMoreVert } from "react-icons/md";

import logoDark from "../../assets/logo-light.svg";
import DeleteModal from "../Modals/DeleteModal";
import {
  deleteBoard,
  resetCreateUpdateBoard,
  fetchAllBoards,
} from "../../redux/features/board/boardSlice";

const Navbar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef();
  const menuBtnRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.board.defaultBoard
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
      dispatch(resetCreateUpdateBoard());
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
        <h3 className="text-2xl  py-7 font-bold">Board</h3>
      </section>

      <section className="flex items-center gap-2 py-7">
        <button className="btn-primary px-4 text-sm">+ Add new task</button>
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
              <button className="text-colorMediumGray  font-medium mb-3">
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

      {showDeleteModal && (
        <DeleteModal
          action={deleteBoard}
          id={id}
          heading="Board"
          setShowDeleteModal={setShowDeleteModal}
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default Navbar;
