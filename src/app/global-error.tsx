'use client' 
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
        <body>
          <h2 className='text-main_brown text-2xl font-Shabnam_B'>عملیات با خطا مواجه شد!</h2>
          <Link href={"/"}>صفحه اصلی</Link>
          <span>{error.message}</span>
          <button onClick={() => reset()}>Try again</button>
        </body>
      </html>
    )
  }