import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import { ToastProvider } from "@/app/context/ToastContainerProvider";
import ProductPageLayout from "@/components/layout-components/ProductPage/ProductPageLayout";
import dbConnection from "@/dbConfigs/db";
import ProductModel from "@/models/categories&products/product";
import CommentModel from "@/models/comment/comment";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
type ProductParams={
  productId:string
}
async function SingleProduct({ params }: {params:ProductParams}) {
  await dbConnection();
  const { productId } = params;
  await CommentModel.findOne({}).limit(1);
  const initialProductData = await ProductModel.findOne({ _id: productId })
    .populate("category")
    .populate("ProductComment")
    .lean();
  return (
    <QueryClientProviderWrapper>
      <ToastProvider>
        <div className="">
          <main className="max-w-[1920px]  ">
            <ProductPageLayout
              initialProductData={JSON.parse(
                JSON.stringify(initialProductData)
              )}
            />
          </main>
        </div>
      </ToastProvider>
    </QueryClientProviderWrapper>
  );
}

export default SingleProduct;
