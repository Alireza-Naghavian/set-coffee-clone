import { TextAriaType } from "@/types/TextFlieds_Forms.type";
import { cva } from "class-variance-authority";
import React from "react";

const inputGroup = cva("focus:outline-none font-Shabnam w-full text-right", {
  variants: {
    variant: {
      outLine: "bg-white  text-mute",
      borderFill: "bg-transparent border-2 border-black/55 text-mute",
    },
    size: {
      medium: "h-[142px]  py-5 px-4 text-base leading-[22px]",
      free: " py-[12px] px-5 text-lg leading-6",
    },
  },
  defaultVariants: {
    variant: "outLine",
    size: "medium",
  },
});
function TextAriaField({
  size,
  variant = "outLine",
  type = "text",
  label,
  placeHolder,
  name,
  id,
  register,
  errors,
  validattionschema,
  value,
  className
}:TextAriaType) {
  return   <div className="flex flex-col gap-y-2">
  <label htmlFor={id} className={"relative font-Shabnam_M"}>
    <span>{label}</span>
    <span className="text-red-500">*</span>
  </label>
  <textarea
    cols={80}
   
    {...register(name, validattionschema)}
    id={id}
    value={value}
    name={name}
    type={type}
    placeholder={placeHolder}
    className={inputGroup({ variant, size, className })}
  />
  {errors && errors[name] && (
    <span className="text-red-500 block text-sm mt-1">
      {errors[name]?.message}
    </span>
  )}
</div>;
}

export default TextAriaField;
