import ProductManagement from "@/components/layout-components/AdminPanel/subRoutes/Products/ProductManagement";
import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import { SingleProductType } from "@/types/models/categories.type";
import dataParser from "@/utils/dataParser/dataParser";
import React from "react";

async function page() {
  await dbConnection();
  const allProduct: SingleProductType[] = await ProductModel.find(
    {},
    "-createdAt -updatedAt -longDesc -shortDesc"
  ).sort({ sold: -1 });
  return (
    <main className="relative max-w-[1920px]">
      <ProductManagement products={dataParser(allProduct)} />
    </main>
  );
}

export default page;
