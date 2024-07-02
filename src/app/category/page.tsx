import React from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import MainShopPage from "@/components/layout-components/mainShopPage/MainShopPage";

function MainShop() {
  return (
    <QueryClientProviderWrapper>
      <main className="max-w-[1920px]">
        <MainShopPage/>
      </main>
    </QueryClientProviderWrapper>
  );
}

export default MainShop;
