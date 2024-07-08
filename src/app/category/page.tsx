import MainShopPage from "@/components/layout-components/mainShopPage/MainShopPage";
import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import dataParser from "@/utils/dataParser/dataParser";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import { all } from "axios";

async function MainShop() {
  await dbConnection();
  const allProduct = await ProductModel.find(
    {},
    "-__V,-createdAt -updatedAt -shortDesc -longDesc -suitableFor"
  )
    .limit(8);
  return (
    <QueryClientProviderWrapper>
        <main className="max-w-[1920px]">
          <MainShopPage initialPageData={dataParser(allProduct)} />
        </main>
    </QueryClientProviderWrapper>
  );
}

export default MainShop;
