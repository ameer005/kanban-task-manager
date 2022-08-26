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
  const dispatch = useDispatch();
  const { id } = useParams();

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
          <Task data={task} />
        </div>
      );
    });
  };

  return (
    <main className=" min-w-[18rem] h-full">
      <h3 className="flex items-center gap-3 mb-4">
        <div className={`h-4 w-4 rounded-full  ${randomColorPicker()}`}></div>
        <div className="text-xs font-bold uppercase text-colorMediumGray tracking-[.15rem]">
          {data.name}
        </div>
      </h3>

      {!data.tasks.length && (
        <div className="h-[75vh] outline-2 outline-dashed outline-colorMediumGray/40 rounded-md"></div>
      )}
      <section className="flex flex-col gap-5">{renderTaskList()}</section>
    </main>
  );
};

export default Column;
