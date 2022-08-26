import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import TaskDetailsModal from "../Modals/TaskDetailsModal";
import DeleteModal from "../Modals/DeleteModal";
import TaskModal from "../Modals/TaskModal";

import {
  fetchAllBoards,
  resetDeletetask,
  deleteTask,
} from "../../redux/features/board/boardSlice";
import { useParams } from "react-router-dom";

const Task = ({ data }) => {
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.board.deleteTask
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetDeletetask());
      dispatch(fetchAllBoards());
      setShowDeleteModal(false);
    }
  }, [isError, isSuccess, isLoading, message]);

  const completedSubTasks = data.subTasks.filter(
    (task) => task.isCompleted === true
  );

  return (
    <div
      onClick={() => setShowTaskDetailsModal(true)}
      className="bg-colorPrimaryLight rounded-lg py-6 px-5 cursor-pointer overlay relative overflow-hidden hover:after:opacity-100"
    >
      <h3 className="text-base font-bold pr-8 mb-2">{data.title}</h3>

      <div className="text-xs text-colorMediumGray font-bold">
        {`${completedSubTasks.length} of ${data.subTasks.length} subtasks`}
      </div>
      {showTaskDetailsModal && (
        <TaskDetailsModal
          task={data}
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
              taskId: data._id,
              columnId: data.status,
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
          task={data}
        />
      )}
    </div>
  );
};

export default Task;
