import Image from "next/image";
import Link from "next/link";
import React from "react";

function WhySetCoffee() {
  return (
    <div className=" md:mt-32 mt-12 bg-gray-300/55 py-5 ">
      <div className="flex lg:flex-row flex-col md:container md:px-24 px-6  items-center lg:gap-x-4 gap-x-0 lg:gap-y-0 gap-y-5">
        <div className="">
          <Image
            width={1920}
            height={1080}
            priority={false}
            src="/images/Home32.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex flex-col w-20 h-20">
            <Image
              width={1920}
              height={1080}
              src="/images/Set-logo.png"
              className="w-full h-full object-cover "
              alt=""
            />
          </div>
          <h5 className="text-main_brown text-[clamp(22px,6vw,44px)] font-Shabnam_B mt-5">
            چرا قهوه ست
          </h5>
          <p className="md:max-w-[470px] font-Shabnam_M ">
            برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان راهنمای
            ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است .تجربه ای
            به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان قهوه ضامن این
            ویژگیها است.
          </p>
          <div className="flex items-center mt-[30px]">
            <Link
              href={"/about-us"}
              className="text-white bg-main  py-[14px] px-5  font-Shabnam_M text-sm"
            >
              بیشتر بخوانید
            </Link>
            <Link
              href={"/categories"}
              className="text-main bg-gray-300/55 tr-200 hover:bg-gray-300  py-[14px] px-5  font-Shabnam_M text-sm"
            >
              فروشگاه
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhySetCoffee;
