import Table from "@/components/UI/Table/Table";
import { SingleProductType } from "@/types/models/categories.type";
import React from "react";
import HeaderProductLayout from "./HeaderProductLayout";
import LargeTRow from "./LargeTRow";
import SmallTRow from "./SmallTRow";
function ProductManagement({ products }: { products: SingleProductType[] }) {
  return (
    <HeaderProductLayout title="مدیریت محصولات">
      <div className="lg:h-[480px] overflow-y-auto">
        <Table variant="singleHead" className="w-full relative mt-10 table">
          {products.length > 0 && (
            <Table.Header variant="singleHead" className="hidden md:block">
              <tr
                className="grid grid-cols-6  rounded-lg child:ml-3 child:text-center p-4
                    bg-main_brown text-white"
              >
                <th>عنوان</th>
                <th>قیمت</th>
                <th>موجودی</th>
                <th>سفارش ثبت شده</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </Table.Header>
          )}
          <Table.Body
            variant="singleHead"
            className="child:md:grid-cols-6 grid-cols-2"
          >
            {/* large table row */}
            {products.map((product: SingleProductType, index: number) => {
              return (
                <React.Fragment  key={index}>
            <LargeTRow product={product}/>
                </React.Fragment>
              );
            })}
            {/* small table row */}
            {products.map((product:SingleProductType)=>{
                return(
                    <React.Fragment key={product._id}>
                        <SmallTRow product={product}/>
                    </React.Fragment>
                )
            })}
          </Table.Body>
        </Table>
      </div>
    </HeaderProductLayout>
  );
}

export default ProductManagement;
