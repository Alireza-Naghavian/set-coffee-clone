import React from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import MainShopPage from "@/components/layout-components/mainShopPage/MainShopPage";
import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import dataParser from "@/utils/dataParser/dataParser";

async function MainShop() {
  await dbConnection();
  const allProduct = await ProductModel.find(
    {},
    "-__V,-createdAt -updatedAt -shortDesc -longDesc -suitableFor"
  )
    .sort({ _id: -1 })
    .limit(10);
  return (
    <QueryClientProviderWrapper>
      <main className="max-w-[1920px]">
        <MainShopPage initialPageData={dataParser(allProduct)} />
      </main>
    </QueryClientProviderWrapper>
  );
}

export default MainShop;
