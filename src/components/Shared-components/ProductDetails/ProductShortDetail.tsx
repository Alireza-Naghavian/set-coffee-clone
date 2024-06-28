import React from 'react'

function ProductShortDetail() {
  return (
    <div className='flex flex-col gap-y-2 child:border-b-2  last:border-b-0 child:py-2 w-full mx-auto child:w-full '>
      <div className="flex items-center justify-between h-full px-2 sm:px-4 ">
        <span className='sm:text-lg !font-Shabnam_B' >وزن</span>
        <span className='sm:text-lg text-sm'>۰.۲۵۰ کیلو گرم</span>
      </div>
      <div className="flex items-center justify-between h-full px-2 sm:px-4">
      <span className='sm:text-lg !font-Shabnam_B' >میزان بو</span>
      <span className='sm:text-lg text-sm'>متوسط به بالا ( FULL CITY )</span>
      </div>
      <div className="flex items-center justify-between h-full px-2 sm:px-4 ">
      <span className='sm:text-lg !font-Shabnam_B text-nowrap' >مناسب برای</span>
      <span className='sm:text-lg text-sm sm:pr-8 pr-4'>اسپرسوی رو گازی – اسپرسو ساز صنعتی – خانگی – مصرف در کافی شاپ</span>
      </div>
    </div>
  )
}

export default ProductShortDetail