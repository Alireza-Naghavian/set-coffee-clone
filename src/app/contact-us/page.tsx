import ContactUs from "@/components/layout-components/ContactUs/ContactUs";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee-تماس با ما",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  icons: "/images/favicon.png",
};
function page() {
  return (
    <main className="relative max-w-[1920px]">
      <ContactUs />
    </main>
  );
}

export default page;
