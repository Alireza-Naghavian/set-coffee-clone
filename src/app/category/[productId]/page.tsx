import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import ProductPageLayout from "@/components/layout-components/ProductPage/ProductPageLayout";
import React from "react";

function SingleProduct() {
  return (
    <QueryClientProviderWrapper>
      <div className="">
        <main className="max-w-[1920px]  ">
          <ProductPageLayout />
        </main>
      </div>
    </QueryClientProviderWrapper>
  );
}

export default SingleProduct;
