import React from 'react'

function ProductShortDetail() {
  return (
    <div className='flex flex-col gap-y-2 child:border-b-2  last:border-b-0 child:py-2 w-full mx-auto '>
      <div className="flex items-center justify-between h-full px-4 ">
        <span className='text-lg !font-Shabnam_B' >وزن</span>
        <span>۰.۲۵۰ کیلو گرم</span>
      </div>
      <div className="flex items-center justify-between h-full px-4 ">
      <span className='text-lg !font-Shabnam_B' >میزان بو</span>
      <span>متوسط به بالا ( FULL CITY )</span>
      </div>
      <div className="flex items-center justify-between h-full px-4 ">
      <span className='text-lg !font-Shabnam_B' >مناسب برای</span>
      <span>اسپرسوی رو گازی – اسپرسو ساز صنعتی – خانگی – مصرف در کافی شاپ</span>
      </div>
    </div>
  )
}

export default ProductShortDetail