import React from "react";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const DeleteModal = ({
  setShowDeleteModal,
  heading,
  id,
  action,
  isLoading,
  deletePyaload,
}) => {
  return ReactDom.createPortal(
    <main
      onClick={() => setShowDeleteModal(false)}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorPrimaryLight text-colorNeutral w-full max-w-[30rem] px-7 py-6 md:px-5  rounded-md modal-margin"
      >
        <h3 className="text-lg font-bold text-colorRed mb-6">
          {`Delete this ${heading}`}
        </h3>

        <div className="flex flex-col gap-6">
          <p className="text-colorMediumGray text-sm font-medium leading-6">
            {`Are you sure you want to delete the ${heading}? This action will remove
            all columns and tasks and cannot be reversed.`}
          </p>
          <button
            onClick={() => action(heading === "Task" ? deletePyaload : id)}
            className="text-sm bg-colorRed hover:bg-colorLightRed rounded-full  ut-animation font-bold py-[10px] w-full"
            type="button"
          >
            {isLoading ? <LoadingSpinner /> : "Delete"}
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-sm -mt-3 bg-colorNeutral rounded-full text-colorpurple ut-animation font-bold py-[10px] w-full"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>,
    document.getElementById("modal-delete")
  );
};

export default DeleteModal;
