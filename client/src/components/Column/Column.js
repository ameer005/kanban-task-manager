import React, { useState, useEffect } from "react";
import Task from "../Task/Task";

import TaskDetailsModal from "../Modals/TaskDetailsModal";
import DeleteModal from "../Modals/DeleteModal";
import TaskModal from "../Modals/TaskModal";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllBoards,
  resetDeletetask,
  deleteTask,
} from "../../redux/features/board/boardSlice";
import { useParams } from "react-router-dom";

const Column = ({ data }) => {
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.board.deleteTask
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetDeletetask());
      dispatch(fetchAllBoards());
      setShowDeleteModal(false);
    }
  }, [isError, isSuccess, isLoading, message]);

  const randomColorPicker = () => {
    const colors = [
      "bg-colorpurple",
      "bg-red-300",
      "bg-green-300",
      "bg-blue-300",
      "bg-blue-700",
      "bg-orange-400",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
  };

  const renderTaskList = () => {
    return data.tasks.map((task) => {
      return (
        <div key={task._id}>
          <div onClick={() => setShowTaskDetailsModal(true)}>
            <Task
              data={task}
              setShowTaskDetailsModal={setShowTaskDetailsModal}
            />
          </div>
          {showTaskDetailsModal && (
            <TaskDetailsModal
              task={task}
              setShowTaskDetailsModal={setShowTaskDetailsModal}
              setShowDeleteModal={setShowDeleteModal}
              setShowTaskModal={setShowTaskModal}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              action={deleteTask}
              deletePyaload={{
                id: id,
                data: {
                  taskId: task._id,
                  columnId: task.status,
                },
              }}
              id={id}
              heading="Task"
              setShowDeleteModal={setShowDeleteModal}
              isLoading={isLoading}
            />
          )}
          {showTaskModal && (
            <TaskModal
              isNew={false}
              setShowTaskModal={setShowTaskModal}
              task={task}
            />
          )}
        </div>
      );
    });
  };

  return (
    <main className="w-full max-w-[18rem] h-full">
      <h3 className="flex items-center gap-3 mb-4">
        <div className={`h-4 w-4 rounded-full  ${randomColorPicker()}`}></div>
        <div className="text-xs font-bold uppercase text-colorMediumGray tracking-[.15rem]">
          {data.name}
        </div>
      </h3>

      {!data.tasks.length && (
        <div className=" h-[95%] outline-2 outline-dashed outline-colorMediumGray/40 rounded-md"></div>
      )}
      <section className="flex flex-col gap-5">{renderTaskList()}</section>
    </main>
  );
};

export default Column;
