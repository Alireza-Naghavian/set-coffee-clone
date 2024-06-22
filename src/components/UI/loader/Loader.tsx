import React from "react";
type LoaderType = {
  loadingCondition: boolean;
  width?: string;
  height?: string;
  className?: any;
};
function Loader({
  loadingCondition,
  width = "w-6",
  height = "h-6",
  className,
}: LoaderType) {
  return (
    <div className="flex-center">
      <svg
        className={`${width} ${height} ${
          loadingCondition ? "block" : "hidden"
        } animate-spin ${className} `}
        viewBox="0 0 100 100"
      >
        <circle
          fill="none"
          stroke-width="10"
          className="stroke-current opacity-40"
          cx="50"
          cy="50"
          r="40"
        />
        <circle
          fill="none"
          stroke-width="10"
          className="stroke-current"
          stroke-dasharray="250"
          stroke-dashoffset="210"
          cx="50"
          cy="50"
          r="40"
        />
      </svg>
    </div>
  );
}

export default Loader;
