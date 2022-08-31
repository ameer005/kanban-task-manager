import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex justify-center px-4 py-3 bg-colorRed w-full rounded-md text-sm font-medium mb-4">
      {message}
    </div>
  );
};

export default Error;
