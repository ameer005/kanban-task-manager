import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

import { IoClose } from "react-icons/io5";

import { taskSchema } from "../../utils/yup/schema";
import InputField from "../FormComps/InputField";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SelectField from "../FormComps/SelectField";
import {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useFetchBoard,
} from "../../hooks/api/board/useBoard";

const TaskModal = ({ setShowTaskModal, isNew, task }) => {
  const { id } = useParams();

  const [isSelectStatusOpen, setIsSelectStatusOpen] = useState(false);
  const [updateTaskData, setupdateTaskData] = useState();
  const [selectStatusText, setSelectStatusText] = useState();

  // fetching board by id
  const { data } = useFetchBoard(id);
  const board = data?.data.data.board;

  // create task query
  const {
    mutate: createTask,
    isSuccess: createTaskSuccess,
    isLoading: createTaskLoaing,
  } = useCreateTask();

  const {
    mutate: updateTask,
    isSuccess: updateTaskSuccess,
    isLoading: updateTaskLoaing,
  } = useUpdateTask();

  // delete task query
  const { mutate: deleteTask, isSuccess: deleteTaskSuccess } = useDeleteTask();

  useEffect(() => {
    if (createTaskSuccess || updateTaskSuccess) {
      setShowTaskModal(false);
    }
  }, [createTaskSuccess, updateTaskSuccess]);

  useEffect(() => {
    if (deleteTaskSuccess) {
      createTask(updateTaskData);
    }
  }, [deleteTaskSuccess]);

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

  const activeStatus = board.columns.find(
    (column) => column._id === task?.status
  );

  useEffect(() => {
    if (!isNew && task) {
      setValue("title", task.title);
      setValue("subTasks", task.subTasks);
      setValue("status", task.status);
      setSelectStatusText(activeStatus.name);
    } else {
      setSelectStatusText(board?.columns[0].name || "Select Status");
      setValue("status", board?.columns[0]._id);
    }
  }, []);

  const formSubmit = (formData) => {
    // console.log(formData);
    if (isNew) {
      const payload = {
        id: id,
        data: { ...formData },
      };

      createTask(payload);
    } else if (formData.status === task.status) {
      const payload = {
        id: id,
        data: { columnId: task.status, taskId: task._id, task: formData },
      };

      updateTask(payload);
    } else {
      const deletePyaload = {
        id: id,
        data: {
          taskId: task._id,
          columnId: task.status,
        },
      };

      const payload = {
        id: id,
        data: { ...formData },
      };
      setupdateTaskData(payload);

      deleteTask(deletePyaload);
      // setTimeout(() => {
      //   createTask(payload);
      // }, 500);
    }
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
        className="bg-colorPrimaryLight text-colorNeutral w-full max-w-[30rem] px-7 py-6 md:px-5  rounded-md max-h-[78vh] overflow-y-scroll scrollbar-modal modal-margin"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold mb-6">
            {isNew ? "Add New Task" : "Edit Task"}
          </h3>
          <IoClose
            onClick={() => setShowTaskModal(false)}
            className="h-6 w-6 cursor-pointer"
          />
        </div>

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

          <div className="">
            <h3 className="mb-2 text-sm font-bold">Subtasks</h3>

            <div className="flex flex-col gap-2 mb-4">
              {fields.map((subTask, index) => (
                <div
                  key={subTask.id}
                  className="flex items-center gap-5 md:gap-3"
                >
                  <div className="flex-1">
                    <label>
                      <input
                        placeholder=""
                        type="text"
                        name={`subTasks.${index}.title`}
                        className={`input ${
                          errors.subTasks
                            ? "border-red-500"
                            : "border-colorPrimaryLight2"
                        }`}
                        {...register(`subTasks.${index}.title`)}
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
              onClick={() => append({ title: "", isCompleted: false })}
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
            {createTaskLoaing || updateTaskLoaing ? (
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
