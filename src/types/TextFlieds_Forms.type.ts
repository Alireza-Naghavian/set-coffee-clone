export type TextFieldType = {
  label?: string;
  type: string;
  id: string;
  placeHolder?: string;
  name: string;
  value?: string | number;
  className?: string;
  size?: "mediumSize" | "largeSize"
  variant: "outLine" | "borderFill" | "rounded";
  labelVariant?: "boldSize" | "thinSize";
} & React.ComponentProps<"input">;
