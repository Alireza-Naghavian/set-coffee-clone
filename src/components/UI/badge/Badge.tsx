import React from "react";

function Badge({ content }: { content: string | number }) {
  return (
    <span
      className="rounded-xl px-2 py-[2px] w-max text-dark_shade 
     group-hover:text-white tr-200 
     text-xs border border-gray-200 group-hover:border-main_brown group-hover:bg-main_brown "
    >
      {content.toLocaleString("fa-Ir")}
    </span>
  );
}

export default Badge;
