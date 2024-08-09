import React from "react";
import DOMPurify from "dompurify";

function ProductDescription({ productDesc }: { productDesc: string }) {
  return (
    <div className="flex flex-col gap-y-8 mt-6">
      <div dangerouslySetInnerHTML={{ __html: productDesc }} />
    </div>
  );
}

export default ProductDescription;
