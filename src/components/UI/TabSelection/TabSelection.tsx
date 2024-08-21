import { SetState } from "@/types/global.type";
import React from "react";
export type TabSelectionType = {
  setActiveTab: SetState<string>;
  children: React.ReactNode;
  activeTab: string;
  options:{label:string,value:string,optionalItem?:any}[];
  optionalValue?:any
  wrapperClassName?:string
  btnClassName?:string
};
function TabSelection({
  setActiveTab,
  options,
  children,
  activeTab,
  optionalValue,
  wrapperClassName,
  btnClassName
}: TabSelectionType) {
  return (
    <div className="relative !w-[90%] mx-auto ">
      {/* tab header */}
      <div
        className={`flex-center gap-x-8 sm:!gap-x-16 border-b-2
       w-full pb-2 child:font-Shabnam_B child:text-[#777777] sm:text-base  text-sm ${wrapperClassName}`}>
         {options.map((option,index:number)=>{
        return   <button key={index}
        className={` !bg-white focus:outline-none ${btnClassName}  ${activeTab == option.value && "!text-main_green"}`}
        onClick={() => setActiveTab(option.value)}>
        {option.label}
        {option.optionalItem ? <span className="pr-1">({optionalValue})</span>:null}
      </button>
      })}
      </div>
      <div className="">{children}</div>
    </div>
  );
}

export default TabSelection;
