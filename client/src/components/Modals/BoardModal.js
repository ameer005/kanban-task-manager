import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IoClose } from "react-icons/io5";

import InputField from "../FormComps/InputField";
import { boardSchema } from "../../utils/yup/schema";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import {
  createNewBoard,
  resetCreateUpdateBoard,
  fetchAllBoards,
  updateBoard,
} from "../../redux/features/board/boardSlice";

const BoardModal = ({ setShowBoardModal, isNew, board }) => {
  const dispatch = useDispatch();
  const { isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.board.createAndUpdateBoard
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetCreateUpdateBoard());
      dispatch(fetchAllBoards());
      setShowBoardModal(false);
    }
  }, [isError, message, isSuccess]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(boardSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  useEffect(() => {
    if (!isNew && board) {
      setValue("name", board.name);
      setValue("columns", board.columns);
    }
  }, []);

  const formSubmit = (formData) => {
    console.log(formData);
    if (isNew) {
      dispatch(createNewBoard(formData));
    } else {
      const payload = {
        id: board._id,
        data: { ...formData },
      };

      dispatch(updateBoard(payload));
    }
  };

  return ReactDom.createPortal(
    <main
      onClick={() => setShowBoardModal(false)}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorPrimaryLight text-colorNeutral w-full max-w-[30rem] px-7 py-6 rounded-md modal-height "
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold mb-6">
            {isNew ? "Add New Board" : "Edit Board"}
          </h3>

          <IoClose
            onClick={() => setShowBoardModal(false)}
            className="h-6 w-6 cursor-pointer"
          />
        </div>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-6 "
        >
          <InputField
            errors={errors}
            register={register}
            labelText={"Board Name"}
            type="text"
            name="name"
            placeHolder="e.g. Web Design"
          />

          <div className="modal-overflow">
            <h3 className="mb-2 text-sm font-bold">Board Columns</h3>

            <div className="flex flex-col gap-2 mb-4">
              {fields.map((column, index) => (
                <div key={column.id} className="flex items-center gap-5">
                  <div className="flex-1">
                    <label>
                      <input
                        placeholder="e.g. Todo"
                        type="text"
                        name={`columns.${index}.name`}
                        className={`input ${
                          errors.columns
                            ? "border-red-500"
                            : "border-colorPrimaryLight2"
                        }`}
                        {...register(`columns.${index}.name`)}
                      />
                    </label>
                  </div>
                  <IoClose
                    onClick={() => remove(index)}
                    className="h-6 w-6 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <button
              className="text-sm bg-colorNeutral rounded-full text-colorpurple ut-animation font-bold py-[11px] w-full"
              type="button"
              onClick={() => append({ name: "" })}
            >
              + Add New Column
            </button>
          </div>

          <button type={"submit"} className="btn-primary text-sm">
            {isLoading ? (
              <LoadingSpinner />
            ) : isNew ? (
              "Create New Board"
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </main>,
    document.getElementById("modal-board")
  );
};

export default BoardModal;
