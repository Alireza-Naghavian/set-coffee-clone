import Policy from "@/components/layout-components/Policy/Policy";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee-سیاست ها",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  icons: "/images/favicon.png",
};
function page() {
  return (
    <main className="relative max-w-[1920px]">
      <Policy />
    </main>
  );
}

export default page;
