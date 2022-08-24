import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";

const SelectField = ({ setSelectOpen, selectText, isSelectOpen, list }) => {
  return (
    <div className="relative">
      <div
        onClick={() => setSelectOpen((prev) => !prev)}
        className="input flex items-center justify-between border-colorPrimaryLight2 cursor-pointer"
      >
        <span className="font-bold">{selectText}</span>
        {isSelectOpen ? (
          <BiChevronUp className="text-neutralMain/40  text-2xl" />
        ) : (
          <BiChevronDown className="text-neutralMain/40  text-2xl" />
        )}
      </div>

      <div
        className={`scrollbar flex flex-col gap-1 bg-colorPrimary absolute py-3 overflow-y-scroll top-[125%] left-0  w-full max-h-24 rounded-sm px-1 ${
          !isSelectOpen && "hidden"
        }`}
      >
        {/* {serverNameList()} */}
        {list()}
      </div>
    </div>
  );
};

export default SelectField;
