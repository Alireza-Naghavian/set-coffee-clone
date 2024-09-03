"use client"
import AddProductForm from "./AddProductForm";
import HeaderProductLayout from "./HeaderAdminLayout";
function Products() {
  return (
<HeaderProductLayout title="افزودن محصول جدید">
       {/* add product form */}
    <AddProductForm/>
</HeaderProductLayout>
 
  )
}

export default Products