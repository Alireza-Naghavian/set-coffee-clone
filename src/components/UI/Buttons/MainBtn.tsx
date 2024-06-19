import React from "react";
import { cva } from "class-variance-authority";
export type Size = "small"| "medium" | "large";
export type Variant = "primary" | "secondary" | "roundedSecondary" | "roundedPrimary";
type ButtonProps = {
  size?: Size;
  variant?: Variant;
  type?: string;
} & React.ComponentProps<"button">;
const button = cva("text-center font-Shabnam_M w-full tr-300 text-white", {
  variants: {
    variant: {
      primary: "bg-main_green hover:bg-main_green_dark ",
      secondary: "bg-main_brown hover:bg-main ",
      roundedSecondary: "bg-main_brown hover:bg-main rounded-lg ",
      roundedPrimary: "bg-main_green hover:bg-main_green_dark  rounded-lg ",
    },
    size: {
      small: "text-sm h-[42px] sm:max-w-[170px] xs:w-fit  py-[5px] px-3 ",
      medium: "text-sm h-[42px]  py-[5px] px-5 ",
      large: "mt-2.5 h-[46px] py-1.5 px-6 text-lg leading-7",
    },
  },
  defaultVariants:{
    variant:"primary",
    size:"medium"
  }
});

function MainBtn({
  children,
  className = "",
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export default MainBtn;
