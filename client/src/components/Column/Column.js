import React from "react";
import Task from "../Task/Task";

const Column = ({ data }) => {
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
      return <Task key={task._id} data={task} />;
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
