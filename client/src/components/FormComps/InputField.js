import React from "react";

const InputField = ({
  labelText,
  type,
  name,
  placeHolder,
  register,
  errors,
}) => {
  return (
    <label>
      <div className="text-sm font-bold mb-2">{labelText}</div>
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        className={`input ${
          errors[name] ? "border-red-500" : "border-colorPrimaryLight2"
        }`}
        {...register(name)}
      />
    </label>
  );
};

export default InputField;
