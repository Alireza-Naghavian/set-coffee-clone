import { TextFieldType } from "@/types/TextFlieds_Forms.type";
import { cva } from "class-variance-authority";

const inputGroup = cva(" focus:outline-none font-Shabnam w-full text-right", {
  variants: {
    variant: {
      outLine: "bg-white border-2 text-[#777777]",
      borderFill: "bg-transparent border-2 border-black/55 text-[#777777]",
      rounded: "bg-white border-2 border-black/55 text-[#777777] rounded-lg",
    },
    size: {
      mediumSize: "h-[42px]  py-5 px-4 text-base leading-[22px]",
      largeSize: "h-[50px] py-[12px] px-5 text-lg leading-6",
    },
    labelVariant: {
      boldSize:
        "font-Shabnam_B text-base leading-6 text-[#242424] max-h-[24px] block",
      thinSize:
        "font-Shabnam_M text-sm leading-4 text-[#242424] max-h-[18px] block",
    },
  },
  defaultVariants: {
    size: "mediumSize",
    variant: "outLine",
    labelVariant: "boldSize",
  },
});

function MainTextField({
  className = "",
  type = "text",
  value,
  label,
  placeHolder = "",
  name,
  id,
  variant = "outLine",
  labelVariant = "boldSize",
  register,
  required = true,
  size,
  validattionschema,
  errors,
  readOnly=false
}: TextFieldType) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id} className={"relative font-Shabnam_M"}>
        <span className={"font-Shabnam_B"}>{label}</span>

       {required &&  <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name, validattionschema)}
        id={id}
        value={value}
        name={name}
        type={type}
        readOnly={readOnly}
        placeholder={placeHolder}
        className={inputGroup({ variant, size, className, labelVariant })}
      />
      {errors && errors[name] && (
        <span className="text-red-500 block text-sm mt-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default MainTextField;
