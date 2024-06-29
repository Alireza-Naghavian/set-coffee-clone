import React from "react";
type productDetailTYpe = {
  smell: string;
  suitableFor: string;
  weight: number;
};
function ProductShortDetail({ smell, suitableFor, weight }: productDetailTYpe) {
  return (
    <div className="flex flex-col gap-y-2 child:border-b-2  last:border-b-0 child:py-2 w-full mx-auto child:w-full ">
      <div className="flex items-center justify-between h-full px-2 sm:px-4 ">
        <span className="sm:text-lg !font-Shabnam_B">وزن</span>
        <span className="sm:text-lg text-sm">{weight} کیلو گرم</span>
      </div>
      <div className="flex items-center justify-between h-full px-2 sm:px-4">
        <span className="sm:text-lg !font-Shabnam_B">میزان بو</span>
        <span className="sm:text-lg text-sm">{smell}</span>
      </div>
      <div className="flex items-center justify-between h-full px-2 sm:px-4 ">
        <span className="sm:text-lg !font-Shabnam_B text-nowrap">
          مناسب برای
        </span>
        <span className="sm:text-lg text-sm sm:pr-8 pr-4">{suitableFor}</span>
      </div>
    </div>
  );
}

export default ProductShortDetail;
