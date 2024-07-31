import MainBtn from '@/components/UI/Buttons/MainBtn'
import React from 'react'
import styles from "../Cart.module.css"
function TotalPriceSection() {
  return (
    <div className={styles.total_price_wrapper}>
        <p className={styles.total_price_title}>جمع کل سبد خرید</p>
        {/* number of  product in basket */}
        <span className={styles.total_Price_group}>
        <span>محصولات داخل سبد خرید:</span>
        <span>۱۲ محصول</span>
        </span>
        {/* total basket price */}
        <span className={styles.total_Price_group}>
        <span> مجموع قیمت سبد خرید:</span>
        <span>۱,۲۵۰,۰۰۰ تومان</span>
        </span>
        {/* tax? */}
        <span className={styles.total_Price_group}>
        <span >مالیات ارزش بر افزوده:</span>
        <span >۱۲۵,۰۰۰ تومان</span>
        </span>
        {/* final price */}
        <span className={styles.total_Price_group}>
        <span className=' text-xl'> مبلغ قابل پرداخت:</span>
        <span className=' text-lg'>۱۲۵,۰۰۰ تومان</span>
        </span>
        <MainBtn className='mt-12 '>نهایی کردن خرید</MainBtn>
    </div>
  )
}

export default TotalPriceSection