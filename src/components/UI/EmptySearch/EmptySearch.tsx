import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";
function EmptySearch() {
  return (
    <div className="max-w-[245px] h-[60px] 
    py-2 px-3 flex-center gap-x-2 text-white
     font-Shabnam_M bg-[#FFD13A] ">
      <PiWarningCircleLight />
      <span>هیج محصولی یافت نشد .</span>
    </div>
  );
}

export default EmptySearch;
