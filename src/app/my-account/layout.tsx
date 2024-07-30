import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import LinkList from "@/components/UI/LinkList/LinkList";
import React from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import HeaderPageLayout from "@/components/Shared-components/HeaderPageLayout/HeaderPageLayout";
export const dynamic = "force-dynamic";
async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProviderWrapper>
      <div className="relative child:lg:px-10 flex  flex-col child:md:px-0 ">
        <HeaderPageLayout
          linkTarget="/my-account"
          linkTitle="حساب کاربری من"
          mainTitle="حساب کاربری من"
        />
        {/* sidebar & content */}
        <div className="w-full flex md:flex-row flex-col items-start !lg:px-20  mt-8">
          {/* side bar */}
          <div className=" py-6 lg:h-[555px] md:h-screen px-4 w-full  md:w-[345px] md:max-w-[345px] border-l border-l-gray-300">
            <h3 className="text-right font-Shabnam_B text-xl text-dark_shade  border-b-2 border-b-gray-300 pb-2   ">
              <span className="mr-3">حساب کاربری من</span>
            </h3>
            {/* link list */}
            <ul
              className="flex flex-col mt-2 mr-2 py-2 gap-y-1 child:text-base
         child:font-Shabnam_B child:transition-all duration-300 child-hover:!bg-gray-100 
         child:py-2 child:pr-2 child:text-dark_shade child:w-[95%]"
            >
              <LinkList />
            </ul>
          </div>
          {/* content */}
          <div className="w-full relative  lg:mt-6  h-full px-6  ">
            {children}
          </div>
        </div>
      </div>
    </QueryClientProviderWrapper>
  );
}

export default layout;
