import HomePageLayout from "@/components/layout-components/HomePage/HomePageLayout";
import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import dataParser from "@/utils/dataParser/dataParser";

export default async function Home() {
  await dbConnection();
  const sortedCategories = await CategoryModel.aggregate([
    {
      $addFields: {
        productCount: { $size: "$products" },
      },
    },
    {
      $sort: { productCount: -1 },
    },
    {
      $project: {
        title: 1,
        productCount: 1,
        "products._id":1,
        "products.score": 1,
        "products.price": 1,
        "products.cover": 1,
        "products.title": 1,
        "products.shortDesc" : 1,
        "products.tags" : 1,
        "products.entities":1
      },
    },
  ]);
  const filterProductCount = sortedCategories?.filter((product) => {
    return product.productCount < 12 && product.productCount > 0;
  });
  console.log(filterProductCount);
  return (
    <main className="max-w-[1920px]  relative">
      <HomePageLayout filteredProdoucts={ dataParser(filterProductCount)} />
    </main>
  );
}
