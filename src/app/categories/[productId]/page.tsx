import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import ProductPageLayout from "@/components/layout-components/ProductPage/ProductPageLayout";
import dbConnection from "@/dbConfigs/db";
import CategoryModel from "@/models/categories&products/categories";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import dataParser from "@/utils/dataParser/dataParser";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
type ProductParams={
  productId:string
}
export const revalidate  = 3600
export const generateStaticParams = async ()=>{
  await dbConnection();
  await CommentModel.findOne({}).limit(1);
  await CategoryModel.findOne({}).limit(1);
  const initialProductData = await ProductModel.find({score:{$gt:3}})
    .populate("category")
    .populate("ProductComment")
    .lean();
    const params = initialProductData.map((product)=>({_id:product._id}))
    return params
}
async function SingleProduct({ params }: {params:ProductParams}) {
  await dbConnection();
  const { productId } = params;
  if(!isValidObjectId(productId)) return notFound();
  await CommentModel.findOne({}).limit(1);
  const initialProductData = await ProductModel.findOne({ _id: productId })
    .populate("category")
    .populate("ProductComment")
    .lean();
  return (
    <QueryClientProviderWrapper>

        <div className="relative">
          <main className="max-w-[1920px]  ">
            <ProductPageLayout
              initialProductData={dataParser(initialProductData)}
            />
          </main>
        </div>

    </QueryClientProviderWrapper>
  );
}

export default SingleProduct;
