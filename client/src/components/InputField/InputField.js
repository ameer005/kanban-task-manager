import React from "react";

const InputField = ({ labelText, type, name, placeHolder }) => {
  return (
    <label>
      <div className="text-sm font-bold mb-2">{labelText}</div>
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        className="input"
      />
    </label>
  );
};

export default InputField;
