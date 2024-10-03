import React, { useState } from "react";
import "./textFieldstyle.css"
import { SearhcBoxType } from "@/types/TextFlieds_Forms.type";

function SimpleCheckBox({
  className = "",
  type,
  value,
  label,
  name,
  register,
  required = true,
  id,
}: SearhcBoxType) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="bg-main_brown/35 w-fit p-2 rounded-xl">
      <label htmlFor={id} className={`checkbox text-2xl ${className}`}>
        <input
          className="checkbox__input"
          name={name}
          id={id}
          required={required}
          onInput={() => setChecked((is) => !is)}
          {...register(name)}
          value={value}
          type={type}
        />
        <span
          className={`size-1   px-2 py-2 rounded-sm ${
            checked ? "bg-sky-500" : "dark:bg-white bg-gray-100"
          }`}
        ></span>
        <span className="text-base  font-Shabnam_M select-none">
          {label}
          {required && <span className="text-red-500">*</span>}
        </span>
      </label>
    </div>
  );
}

export default SimpleCheckBox;
