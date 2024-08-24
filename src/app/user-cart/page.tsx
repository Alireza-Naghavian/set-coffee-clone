import Cart from "@/components/layout-components/Cart/Cart";
import React from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
export const dynamic = "force-dynamic";
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
