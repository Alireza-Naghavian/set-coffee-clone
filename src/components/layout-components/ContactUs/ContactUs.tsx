import HeaderPageLayout from "@/components/Shared-components/HeaderPageLayout/HeaderPageLayout";
import dynamic from "next/dynamic";

import Link from "next/link";

import {
  FaAddressBook,
  FaCoffee,
  FaInternetExplorer,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const NoSSR = dynamic(() => import("@/components/UI/Map/Map"), {
  ssr: false,
});
function ContactUs() {
  return (
    <div className="">
      <div className="relative child:lg:px-10 flex  flex-col child:md:px-0 ">
        <HeaderPageLayout
          mainTitle="تماس با ما"
          linkTarget="/contact-us"
          linkTitle="تماس با ما"
        />
      </div>
      <div className="w-full md:px-32 md:mt-12  px-8">
        <div className="flex lg:flex-row flex-col gap-y-12 lg:justify-between  lg:items-center w-full p-8 shadow-md lg:h-[500px] mt-8">
          <div className=" lg:w-1/2 flex flex-col items-start justify-center ">
            {/* ? header */}
            <div className="flex flex-col gap-y-4 child:text-right">
              <span className="w-full text-mute font-Shabnam_M">
                تماس با ما
              </span>
              <h4 className="font-Shabnam_B text-2xl leading-6">
                اطلاعات تماس
              </h4>
            </div>
            {/* contact options list */}
            <ul className="flex flex-col lg:flex-nowrap flex-wrap child:mt-4 space-y-4  child:child:last:text-base child:gap-x-4 xl:max-w-[500px] items-start child:child:text-mute ">
              <li className="flex md:flex-row flex-col gap-y-4 justify-start md:items-center ">
                <FaCoffee className="!text-2xl" />
                <span>شرکت فنجان داغ خوارزمی (کارخانه قهوه ست )</span>
              </li>
              <li className="flex md:flex-row flex-col gap-y-4 justify-start md:items-center ">
                <FaInternetExplorer className="!text-2xl" />
                <span>set-coffee.com</span>
              </li>
              <li className="flex md:flex-row flex-col gap-y-4 justify-start md:items-center ">
                <FaAddressBook size={28} className="" />
                <span>
                  تهران. پاکدشت . شهرک صنعتی خوارزمی. فاز 2 . بلوار بهارستان.
                  خیابان ماگنولیا بلوک آ117
                </span>
              </li>
              <li className="flex justify-start items-center ">
                <FaPhone className="!text-2xl" />
                <Link className="mt-2" href={"tel:021-36479228"}>
                  021-36479228
                </Link>
              </li>
              <li className="flex md:flex-row flex-col gap-y-4 justify-start md:items-center ">
                <MdEmail className="!text-2xl" />
                <span>coffee[at]set-coffee.com</span>
              </li>
              <li className="flex md:flex-row flex-col gap-y-4 justify-start md:items-center ">
                <FaTelegramPlane className="!text-2xl" />
                <span>
                  تماس با مدیریت از طریق واتساپ و یا تلگرام :
                  <Link href={"tel:09366726563"}>09366726563</Link>
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2   ">
          
              <NoSSR
                position={[35.72021225108499, 51.42222691580869]}
                center={[35.72021225108499, 51.42222691580869]}
              >
                <div className=" z-50 relative p-4">
                  <span> فروشگاه ما</span>
                  <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
                  <p>
                    تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ
                    فجر(جم) – شماره ۱۰
                  </p>
                  <p>021-88305827</p>
                </div>
                <Link href="/about-us" className="p-4 pb-2 hidden lg:inline">
                  درباره فروشگاه
                </Link>
              </NoSSR>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
