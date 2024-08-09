"use client"
import AddProductForm from "./AddProductForm";
function Products() {
  return (
    <div className='relative w-full px-8 mt-10 h-screen lg:h-full'>
        <div className="">
            <h1 className='w-full text-right text-xl lg:text-3xl font-Shabnam_B text-dark_shade'>
                افزودن محصول جدید
            </h1>
        </div>
       {/* add product form */}
    <AddProductForm/>
    </div>
  )
}

export default Products