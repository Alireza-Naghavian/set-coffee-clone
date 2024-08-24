import React from "react";
import styles from "./productDetails.module.css"

function ProductDescription({ productDesc }: { productDesc: string }) {
  return (
    <div className={` ${styles.blogContainer} flex flex-col gap-y-8 mt-6`}>
      <div dangerouslySetInnerHTML={{ __html: productDesc }} />
    </div>
  );
}

export default ProductDescription;
