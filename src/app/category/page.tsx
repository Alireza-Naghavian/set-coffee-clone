import MainShopPage from "@/components/layout-components/mainShopPage/MainShopPage";
import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import dataParser from "@/utils/dataParser/dataParser";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
async function MainShop() {
  return (
    <QueryClientProviderWrapper>
      <main className="max-w-[1920px]">
        <MainShopPage  />
      </main>
    </QueryClientProviderWrapper>
  );
}

export default MainShop;
