import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";
function EmptySearch() {
  return (
    <div className="w-[265px] h-[60px] 
    py-2 px-3 flex-center gap-x-2 text-white
     font-Shabnam_M !bg-[#c9a736] ">
      <PiWarningCircleLight size={25} className="font-Shabnam_B" />
      <span>هیج محصولی یافت نشد .</span>
    </div>
  );
}

export default EmptySearch;
