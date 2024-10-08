import HomePageLayout from "@/components/layout-components/HomePage/HomePageLayout";
import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import CategoryModel from "@/models/categories&products/categories";
import dataParser from "@/utils/dataParser/dataParser";
export const revalidate =1800;
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

  const allBlogs = await BlogsModel.find({},"-__v -updatedAt").limit(3)
  return (
    <main className="max-w-[1920px]  relative">
      <HomePageLayout allBlogs={dataParser(allBlogs)} filteredProdoucts={ dataParser(filterProductCount)} />
    </main>
  );
}
