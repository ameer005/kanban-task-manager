import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

import { MdMoreVert } from "react-icons/md";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SelectField from "../FormComps/SelectField";
import InputField from "../FormComps/InputField";
import { taskSchema } from "../../utils/yup/schema";

import {
  updateTask,
  resetCreateTask,
  fetchAllBoards,
  deleteTask,
  resetDeletetask,
  createTask,
} from "../../redux/features/board/boardSlice";

const TaskDetailsModal = ({
  setShowTaskDetailsModal,
  task,
  setShowDeleteModal,
  setShowTaskModal,
}) => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const menuBtnRef = useRef();
  const { id } = useParams();
  const board = useSelector((state) =>
    state.board.fetchAllBoards.boardsList.find((el) => el._id === id)
  );
  const { isSuccess, isError, isLoading } = useSelector(
    (state) => state.board.createAndUpdateTask
  );
  const [isSelectStatusOpen, setIsSelectStatusOpen] = useState(false);
  const [selectStatusText, setSelectStatusText] = useState("Select Status");
  const [showDropdown, setShowDropdown] = useState(false);
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
    if (isSuccess) {
      dispatch(resetCreateTask());
      dispatch(fetchAllBoards());
      setShowTaskDetailsModal(false);
    }
  }, [isSuccess, isError]);

  // fetching active column name
  const activeStatus = board.columns.find(
    (column) => column._id === task.status
  );

  // default form values
  useEffect(() => {
    setValue("description", task.description);
    setValue("status", task.status);
    setValue("subTasks", task.subTasks);
    setValue("title", task.title);
    setSelectStatusText(activeStatus.name);
  }, []);

  // closing drop down
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

  const formSubmit = (formData) => {
    if (formData.status === task.status) {
      const payload = {
        id: id,
        data: { columnId: task.status, taskId: task._id, task: formData },
      };

      dispatch(updateTask(payload));
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

      dispatch(deleteTask(deletePyaload));

      setTimeout(() => {
        dispatch(createTask(payload));
      }, 200);
      // dispatch(createTask(payload));
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
      onClick={() => setShowTaskDetailsModal(false)}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        // onClick={() => setShowTaskDetailsModal(false)}
        className="bg-colorPrimaryLight text-colorNeutral w-full max-w-[30rem] px-7 py-6 rounded-md modal-height"
      >
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold">{task.title}</h3>
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
                    onClick={() => {
                      setShowTaskModal(true);
                      setShowTaskDetailsModal(false);
                    }}
                    className="text-colorMediumGray  font-medium mb-3"
                  >
                    Edit Task
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setShowTaskDetailsModal(false);
                    }}
                    className="text-colorRed  font-medium"
                  >
                    Delete Task
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="block text-sm font-medium text-colorMediumGray">
            {task.description}
          </p>
        </header>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-6"
        >
          <div>
            <h3 className="mb-2 text-sm font-bold">Subtasks</h3>

            <div className="flex flex-col gap-2">
              {fields.map((subTask, index) => (
                <div key={subTask.id} className="flex items-center gap-5">
                  <div className="flex-1">
                    {/* custom checkbox */}
                    <label className="flex items-center bg-colorPrimary px-4 py-3 rounded-lg hover:bg-colorPrimaryLight2 ut-animation cursor-pointer">
                      <input
                        name={`subTasks.${index}.isCompleted`}
                        {...register(`subTasks.${index}.isCompleted`)}
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 rounded border-gray-300 peer"
                      />
                      <div className="ml-2 text-xs font-bold  peer-checked:line-through peer-checked:text-colorNeutral2">
                        {subTask.title}
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* custom select field */}
          <div>
            <div className="text-sm font-bold mb-2">Current Status</div>
            <SelectField
              setSelectOpen={setIsSelectStatusOpen}
              isSelectOpen={isSelectStatusOpen}
              selectText={selectStatusText}
              list={statusNameList}
            />
          </div>

          <button type={"submit"} className="btn-primary text-sm">
            {isLoading ? <LoadingSpinner /> : "Save Changes"}
          </button>
          <button
            onClick={() => setShowTaskDetailsModal(false)}
            className="text-sm -mt-3 bg-colorNeutral rounded-full text-colorpurple ut-animation font-bold py-[10px] w-full"
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>,
    document.getElementById("modal-taskDetails")
  );
};

export default TaskDetailsModal;
