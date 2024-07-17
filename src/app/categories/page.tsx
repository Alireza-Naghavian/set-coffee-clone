import MainShopPage from "@/components/layout-components/mainShopPage/MainShopPage";
import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import dataParser from "@/utils/dataParser/dataParser";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import ProductModel from "@/models/categories&products/product";
import { Suspense } from "react";
async function MainShop() {
  await dbConnection();
  const allCategories = await CategoryModel.aggregate([
    {
      $addFields: {
        productCount: { $size: "$products" },
      },
    },

    {
      $project: {
        productCount: 1,
        title: 1,
      },
    },
  ]);
  const initProducts = await ProductModel.find({}).limit(8);
  return (
    <QueryClientProviderWrapper>
      <main className="max-w-[1920px]">
        <Suspense>
          <MainShopPage
            initProducts={dataParser(initProducts)}
            allCategories={dataParser(allCategories)}
          />
        </Suspense>
      </main>
    </QueryClientProviderWrapper>
  );
}

export default MainShop;
