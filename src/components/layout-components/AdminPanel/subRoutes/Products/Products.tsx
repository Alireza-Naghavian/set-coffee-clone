"use client"
import AddProductForm from "./AddProductForm";
import HeaderProductLayout from "./HeaderProductLayout";
function Products() {
  return (
<HeaderProductLayout title="افزودن محصول جدید">
       {/* add product form */}
    <AddProductForm/>
</HeaderProductLayout>
 
  )
}

export default Products