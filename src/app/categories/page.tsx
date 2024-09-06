import MainShopPage from "@/components/layout-components/mainShopPage/MainShopPage";
import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import dataParser from "@/utils/dataParser/dataParser";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import { revalidateTag } from "next/cache";
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
  const queryClient = new QueryClient();
  revalidateTag('categories')
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    initialData: dataParser(allCategories),
    queryFn: async () =>
      await CategoryModel.aggregate([
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
      ]),
  });
  const dehydratedState = dehydrate(queryClient);
  const totalProduct = (await ProductModel.find({}, "_id")).length;
  return (
    <QueryClientProviderWrapper>
      <Suspense>
        <HydrationBoundary state={dataParser({ dehydratedState })}>
          <main className="max-w-[1920px]">
            <MainShopPage
              allCategories={allCategories && dataParser(allCategories)}
              totalProduct={totalProduct}
            
            />
          </main>
        </HydrationBoundary>
      </Suspense>
    </QueryClientProviderWrapper>
  );
}

export default MainShop;
