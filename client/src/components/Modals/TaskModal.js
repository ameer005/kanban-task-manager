import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

import { IoClose } from "react-icons/io5";

import { taskSchema } from "../../utils/yup/schema";
import InputField from "../FormComps/InputField";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SelectField from "../FormComps/SelectField";

const TaskModal = ({ setShowTaskModal, isNew, task }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const board = useSelector((state) =>
    state.board.fetchAllBoards.boardsList.find((el) => el._id === id)
  );
  const [isSelectStatusOpen, setIsSelectStatusOpen] = useState(false);
  const [selectStatusText, setSelectStatusText] = useState(
    board?.columns[0].name || "Select Status"
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
  });

  useEffect(() => {
    if (!isNew && task) {
      setValue("name", task.name);
      setValue("columns", task.subTasks);
    } else {
      setValue("status", board?.columns[0]._id);
    }
  }, []);

  const formSubmit = (formData) => {
    console.log(formData);
    // if (isNew) {
    //   dispatch(createNewBoard(formData));
    // } else {
    //   const payload = {
    //     id: board._id,
    //     data: { ...formData },
    //   };

    //   dispatch(updateBoard(payload));
    // }
  };

  const statusNameList = () => {
    return board.columns.map((column) => {
      return (
        <label
          onClick={() => {
            setSelectStatusText(column.name);
            setIsSelectStatusOpen(false);
          }}
          key={column._id}
          className=" px-3 w-full cursor-pointer transition-all text-colorMediumGray hover:text-colorNeutral duration-200 text-sm hover:text-[15px]"
        >
          <input
            className="hidden"
            type="radio"
            value={column._id}
            name="dropdown"
            {...register("status")}
          />
          <span className="">{column.name}</span>
        </label>
      );
    });
  };

  return ReactDom.createPortal(
    <main
      onClick={() => setShowTaskModal(false)}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorPrimaryLight text-colorNeutral w-full max-w-[30rem] px-7 py-6 rounded-md"
      >
        <h3 className="text-lg font-bold mb-6">
          {isNew ? "Add New Task" : "Edit Board"}
        </h3>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-6"
        >
          <InputField
            errors={errors}
            register={register}
            labelText={"Title"}
            type="text"
            name="title"
            placeHolder="e.g. Take a coffee break"
          />

          <label>
            <div className="text-sm font-bold mb-2">Description</div>
            <textarea
              placeholder=""
              name="description"
              className={`input resize-none h-24 ${
                errors.description
                  ? "border-red-500"
                  : "border-colorPrimaryLight2"
              }`}
              {...register("description")}
            />
          </label>

          <div>
            <h3 className="mb-2 text-sm font-bold">Subtasks</h3>

            <div className="flex flex-col gap-2 mb-4">
              {fields.map((subTask, index) => (
                <div key={subTask.id} className="flex items-center gap-5">
                  <div className="flex-1">
                    <label>
                      <input
                        placeholder=""
                        type="text"
                        name={`subTasks.${index}.name`}
                        className={`input ${
                          errors.subTasks
                            ? "border-red-500"
                            : "border-colorPrimaryLight2"
                        }`}
                        {...register(`subTasks.${index}.name`)}
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
              onClick={() => append({ name: "", isCompleted: false })}
            >
              + Add New Subtask
            </button>
          </div>
          {/* custom select field */}
          <SelectField
            setSelectOpen={setIsSelectStatusOpen}
            isSelectOpen={isSelectStatusOpen}
            selectText={selectStatusText}
            list={statusNameList}
          />

          <button type={"submit"} className="btn-primary text-sm">
            {false ? (
              <LoadingSpinner />
            ) : isNew ? (
              "Create Task"
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </main>,
    document.getElementById("modal-task")
  );
};

export default TaskModal;
