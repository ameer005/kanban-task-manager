import React from "react";

import { BsCheckLg } from "react-icons/bs";

const Success = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-green-400 h-5 w-5 rounded-full flex items-center justify-center">
        <BsCheckLg className="h-3 w-3 text-colorNeutral" />
      </div>
    </div>
  );
};

export default Success;
