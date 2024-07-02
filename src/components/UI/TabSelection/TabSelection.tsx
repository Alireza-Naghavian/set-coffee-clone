import { SetState } from "@/types/global.type";
import { CommentModeltype } from "@/types/models/comment.type";
import React from "react";
type TabSelectionType = {
  comments: string;
  moreDetail: string;
  desc: string;
  setActiveTab: SetState<string>;
  children: React.ReactNode;
  activeTab: string;
  filterAcceptableComments:CommentModeltype[]|[]
};
function TabSelection({
  desc,
  moreDetail,
  comments,
  setActiveTab,
  children,
  activeTab,
  filterAcceptableComments
}: TabSelectionType) {
  return (
    <div className="relative !w-[90%] mx-auto ">
      {/* tab header */}
      <div
        className="flex-center gap-x-8 sm:!gap-x-16 border-b-2
       w-full pb-2 child:font-Shabnam_B child:text-[#777777] sm:text-base  text-sm">
        <button
          className={`${activeTab == desc && "!text-main_green"}`}
          onClick={() => setActiveTab(desc)}>
          توضیحات
        </button>
        <button
          className={`text-nowrap ${activeTab == moreDetail && "!text-main_green"}`}
          onClick={() => setActiveTab(moreDetail)}>
          اطلاعات بیشتر
        </button>
        <button
          className={`${activeTab == comments && "!text-main_green"}`}
          onClick={() => setActiveTab(comments)}>
          <span> نظرات </span>
          <span>({filterAcceptableComments?.length.toLocaleString("fa-Ir")})</span>
        </button>
      </div>
      {/* this part must be reponse in many mediaQueries */}
      <div className="">{children}</div>
    </div>
  );
}

export default TabSelection;
