import React, { useState } from "react";

import TaskDetailsModal from "../Modals/TaskDetailsModal";

const Task = ({ data, setShowTaskDetailsModal }) => {
  const completedSubTasks = data.subTasks.filter(
    (task) => task.isCompleted === true
  );

  return (
    <div
      // onClick={() => setShowTaskDetailsModal(true)}
      className="bg-colorPrimaryLight rounded-lg py-6 px-5 cursor-pointer overlay relative overflow-hidden hover:after:opacity-100"
    >
      <h3 className="text-base font-bold pr-8 mb-2">{data.title}</h3>

      <div className="text-xs text-colorMediumGray font-bold">
        {`${completedSubTasks.length} of ${data.subTasks.length} subtasks`}
      </div>
    </div>
  );
};

export default Task;
