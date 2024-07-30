import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import React from "react";

type PageLayoutType = {
  mainTitle: string;
  linkTitle: string;
  linkTarget: string;
};
function HeaderPageLayout({
  mainTitle,
  linkTitle,
  linkTarget,
}: PageLayoutType) {
  return (

      <div
        className="w-full relative mx-auto flex-center headerWrapper text-white 
  flex-col pt-[50px] sm:pt-[100px] lg:pt-[170px]"
      >
        <h1 className="text-[clamp(24px,5vw,68px)] font-Shabnam_B text-center">
          {mainTitle}
        </h1>
        <div className="pb-8 mt-4">
          <Breadcrumb
            firstTarget="/"
            firstTitle={"خانه"}
            nestedStep={1}
            nestedLinks={[{ title: linkTitle, target: linkTarget }]}
          />
        </div>
      </div>
  
  );
}

export default HeaderPageLayout;
