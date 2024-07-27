"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaEnvelope, FaLocationArrow, FaPhone } from 'react-icons/fa'

function Footer() {
  const pathName = usePathname();
  if(pathName === "/register-login") return
  return (
    <footer className="bg-[#111111] mt-20  w-full">
      <div className="lg:container  lg:px-8  md:px-12 px-4">
        <div
          className="grid lg:grid-cols-4 lg:gap-y-0 gap-y-8 sm:grid-cols-2 py-10 my-auto
             grid-cols-1 sm:gap-x-6 "
        >
          <div className="flex flex-col gap-y-5 child:text-white">
            <Link href="/" className="w-[170px] h-[50]">
              <Image
              width={800}
              height={600}
                src="/images/logo_light.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </Link>
            <p className="max-w-[285px]">
              شرکت فنجان داغ خوارزمی، فروشگاه اینترنتی قهوه ست
            </p>
            <div className="flex child:text-white gap-x-2 items-center">
              <FaLocationArrow size={22} />
              <p className="max-h-[150px] max-w-[285px]">
                تهران. شریف آباد . شهرک صنعتی خوارزمی فاز 2 . بلوار بهارستان.
                خیابان ماگنولیا بلوک آ117
              </p>
            </div>
            <div className="flex child:text-white gap-x-2 items-center">
              <FaPhone size={22} />
              <Link href={"tel:02188305827"} className=" max-w-[285px]">پیگیری سفارشات : 02188305827</Link>
            </div>
            <div className="flex child:text-white gap-x-2 items-center">
              <FaEnvelope size={22} />
              <p className=" max-w-[285px]">support [at] set-coffee.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 child:text-white ">
            <h6 className="font-Shabnam_B text-sm">جدیدترین نوشته ها</h6>
          <MinBlogCard cover="/images/weblog_cover_1.webp" title='?آیا کرما برای تهیه اسپرسوی عالی ضروری است' publishDate={new Date()}/>
          <MinBlogCard cover="/images/weblog_cover_2.webp" title="چرا ریزتر آسیاب کردن قهوه طعم اسپرسو ناخوشایندتر می کند" publishDate={new Date()}/>
          </div>
          <div className="flex flex-col lg:items-center gap-y-6 child:text-white">
            <h6 className="font-Shabnam_B text-sm">دسترسی سریع</h6>
            <ul
              className="flex sm:flex-col  xs:flex-row
             xs:gap-x-6 sm:gap-x-0 sm:flex-nowrap
              xs:flex-wrap gap-y-2  ">
              <li><Link href={"/categories"}>فروشگاه</Link></li>
              <li><Link href={"#"}>وبلاگ</Link></li>
              <li><Link href={"#"}>تماس با ما</Link></li>
              <li><Link href={"/about-us"}>درباره ما</Link></li>
            </ul>
          </div>
          {/* enamand and payments */}
          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-1 lg:justify-center">
              <Image
              width={800}
              height={600}
                src="/images/images.png"
                className="w-[75px] rounded-xl"
                alt=""
              />
              <Image
              width={800}
              height={600}
                src="/images/enamad2.jpg"
                className="w-[75px] rounded-xl"
                alt=""
              />
            </div>
            <div className="flex lg:justify-center   gap-x-1 mt-1">
              <Image
              width={800}
              height={600}
                src="/images/melli.png"
                className="w-[60px] rounded-xl"
                alt=""
              />
              <Image
              width={800}
              height={600}
                src="/images/tejarat.png"
                className="w-[60px] rounded-xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-4">
        <Link target='_blank' href={"https://github.com/Alireza-Naghavian"}>
        <p className="text-center font-Shabnam_M text-sm text-white">
          redesign شده توسط alireza-naghavian
        </p>
        </Link>
      </div>
    </footer>
  )
}

const MinBlogCard = ({title,publishDate,cover}:{title:string,publishDate:Date,cover:string})=>{
    return(
       
        <Link
        href=""
        className="max-w-[265px] py-4 flex gap-x-4 border-b last:border-b-0 border-b-gray-300/55"
        >
        <Image
        width={800}
        height={600}
        src={cover}
        className="w-[85px] h-[70px] object-cover"
        alt=""
        />
        <div className="flex flex-col gap-y-2">
          <span className="text-white text-sm font-Shabnam_M">
          {title}
          </span>
          <span className="text-gray-300">{new Date(publishDate).toLocaleDateString("Fa-Ir")}   بدون دیدگاه</span>
        </div>
      </Link>
      
    )
}

export default Footer