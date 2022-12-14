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
    <label className="relative">
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
      {errors[name] && (
        <p className="absolute top-[50%] translate-y-[25%] right-4 font-medium text-colorRed text-xs">
          {errors[name].message}
        </p>
      )}
    </label>
  );
};

export default InputField;
