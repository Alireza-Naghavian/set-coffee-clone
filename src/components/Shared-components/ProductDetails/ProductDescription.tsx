import React from "react";

function ProductDescription({productDesc}:{productDesc:string}) {
  return (
    <div className=" flex flex-col gap-y-8 mt-6">
      <h2 className="text-3xl font-Shabnam_B text-main">قهوه ترکیبی House Blend</h2>
    {productDesc}
    </div>
  );
}

export default ProductDescription;
