import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-colorPrimary h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-colorMediumGray mb-4">
        Page Not Found
      </h1>

      <Link className="btn-primary text-base px-4" to="/">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
