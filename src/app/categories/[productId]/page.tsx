import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import ProductPageLayout from "@/components/layout-components/ProductPage/ProductPageLayout";
import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import dataParser from "@/utils/dataParser/dataParser";
import { isValidObjectId } from "mongoose";
import { Metadata } from "next";
import { notFound } from "next/navigation";
type ProductParams = {
  productId: string;
};
type Props = {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export const revalidate =60;
export const generateStaticParams = async () => {
  await dbConnection();
  await CommentModel.findOne({}, "_id").limit(1);
  await CategoryModel.findOne({}, "_id").limit(1);
  const initialProductData = await ProductModel.find({ score: { $gt: 3 } })
    .populate("category")
    .populate("ProductComment")
    .lean();
  const params = initialProductData.map((product) => ({ _id: product._id }));
  return params;
};
async function SingleProduct({ params }: { params: ProductParams }) {
  await dbConnection();
  const { productId } = params;
  if (!isValidObjectId(productId)) return notFound();
  await CategoryModel.findOne({}, "_id").limit(1);
  await CommentModel.findOne({}, "_id").limit(1);
  const initialProductData = await ProductModel.findOne({ _id: productId })
    .populate("category")
    .populate({
      path: "ProductComment",
      populate: {
        path: "messages.sender",
        select: "userName role",
      },
    })
    .lean();
  return (
    <QueryClientProviderWrapper>
      <div className="relative">
        <main className="max-w-[1920px]">
          <ProductPageLayout
            initialProductData={dataParser(initialProductData)}
          />
        </main>
      </div>
    </QueryClientProviderWrapper>
  );
}


export const generateMetadata = async({params,searchParams}:Props): Promise<Metadata>=>{
  const allProducts = await ProductModel.findOne({_id:params.productId})
const title  = `فروشگاه -${allProducts.title}`
return {
  title
}
}
export default SingleProduct;
 