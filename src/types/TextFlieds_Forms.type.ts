import React from "react";
import { Message, ValidationRule } from "react-hook-form";

export type RegisterOptions = Partial<{
  required?: Message | ValidationRule<boolean>;
  min?: ValidationRule<number | string>;
  max?: ValidationRule<number | string>;
  maxLength?: ValidationRule<number | string>;
  minLength?: ValidationRule<number | string>;
  pattern?: ValidationRule<RegExp>;
  validate?: Record<string, any>;
}>;
export type TextFieldType = {
  label?: string;
  type: string;
  id: string;
  placeHolder?: string;
  name: string;
  value?: string | number;
  className?: string;
  required?: boolean;
  size?: "mediumSize" | "largeSize";
  variant: "outLine" | "borderFill" | "rounded";
  labelVariant?: "boldSize" | "thinSize";
  register: any;
  errors: any;
  validattionschema?: RegisterOptions;
  readOnly?: boolean;
} & React.ComponentProps<"input">;
export type SearhcBoxType = Omit<
  TextFieldType,
  "size" | "variant" | "labelVariant"
> & {
  wrapperStyle?: string;
} & React.ComponentProps<"input">;
export type TextAriaType = Exclude<TextFieldType, "variant" | "labelVariant"> &
  React.ComponentProps<"textarea"> & {
    variant: "outLine" | "borderFill";
    size?: "medium" | "free";
    required?: boolean;
    readOnly?: boolean;
  };
