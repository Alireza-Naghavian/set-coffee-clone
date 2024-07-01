import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import ProductPageLayout from "@/components/layout-components/ProductPage/ProductPageLayout";
import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

async function SingleProduct({ params }: Params) {
  await dbConnection();
  const { productId } = params;
  await CommentModel.findOne({}).sort({_id:-1}).limit(1)
  const initialProductData = await ProductModel.findOne({ _id: productId })
    .populate("category")
    .populate("ProductComment")
    .lean();
  return (
    <QueryClientProviderWrapper>
      <div className="">
        <main className="max-w-[1920px]  ">
          <ProductPageLayout
            initialProductData={JSON.parse(JSON.stringify(initialProductData))}
          />
        </main>
      </div>
    </QueryClientProviderWrapper>
  );
}

export default SingleProduct;
