import React from "react";
type HeaderTitleType = {
  title: string;
  subTitle?: string | null;
};
function HeaderTitle({ title, subTitle }: HeaderTitleType) {
  return (
    <div className="flex flex-col gap-y-3 items-center w-full ">
      <p className="font-Shabnam_M text-[clamp(24px,4vw,36px)] text-main_green_dark">
        {title}
      </p>
      <span className="font-Shabnam text-[15px] text-[#777777]">{subTitle}</span>
    </div>
  );
}

export default HeaderTitle;
