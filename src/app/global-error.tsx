'use client' 
import MainBtn from '@/components/UI/Buttons/MainBtn'
import Link from 'next/link'
import React from 'react'
export default function GlobalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
      <html>
        <body className='flex-center h-screen w-full'>
         <div className="flex-center flex-col gap-y-4 bg-main_brown text-white ">
         <h2 className='text-main_brown text-2xl font-Shabnam_B'>عملیات با خطا مواجه شد!</h2>
          <Link className='bg-main_green_dark font-Shabnam_B' href={"/"}>صفحه اصلی</Link>
          <span >{error.message}</span>
          <MainBtn  onClick={() => reset()}>Try again</MainBtn>
         </div>
        </body>
      </html>
    )
  }