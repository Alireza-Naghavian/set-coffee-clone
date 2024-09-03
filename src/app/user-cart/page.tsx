import Cart from "@/components/layout-components/Cart/Cart";
import React from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee-سبد خرید",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  icons: "/images/favicon.png",
};
function page() {
  return (
    <QueryClientProviderWrapper>
      <main className="relative max-w-[1920px]">
        <Cart />
      </main>
    </QueryClientProviderWrapper>
  );
}

export default page;
