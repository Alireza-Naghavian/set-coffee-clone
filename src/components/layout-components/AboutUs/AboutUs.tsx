import HeaderPageLayout from "@/components/Shared-components/HeaderPageLayout/HeaderPageLayout";
import Breadcrumb from "@/components/UI/breadcrumb/Breadcrumb";
import React from "react";

function AboutUs() {
  return (
    <div className="relative child:lg:px-10 flex  flex-col child:md:px-0 ">
      <HeaderPageLayout linkTarget="/about-us" linkTitle="درباره ما" mainTitle="درباره ما"/>
      <div className="bg-gray-100  py-12">
        <div className=" md:mx-16 mx-6  mt-12 flex md:flex-row flex-col  md:justify-between md:items-center gap-x-12">
          <div className="md:w-1/3 flex flex-col gap-y-6 child:text-dark_shade ">
            <span className="text-right text-lg font-Shabnam_M ">
              درباره ما
            </span>
            <p className="text-4xl text-right font-Shabnam_B max-w-[300px] leading-[50px]">
              فنجان داغ خوارزمی قهوه ست
            </p>
          </div>
          <div className=" md:w-1/3">
            <p className="text-mute text-lg text-justify">
              تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان ضامن این
              ویژگی‌هاست. از ویژگی‌های بارز مجموعه قهوه ست واردات مواد اولیه
              راسا به وسیله مدیریت مجموعه و انتخاب بهترین مواد اولیه جهت تولید
              قهوه است.
            </p>
          </div>
          <div className=" md:w-1/3 flex self-start mt-2">
            <p className="text-mute text-lg text-justify">
              مجموعه قهوه ست اولین مجموعه مرتبط با قهوه در ایران است که در سال
              2007 به عضویت انجمن تخصصی قهوه اروپادر آمده است .
            </p>
          </div>
        </div>
      </div>
      {/* setCoffee story */}
      <div className="md:mx-16 mx-6  mt-32 flex md:flex-row flex-col  md:justify-between md:items-center gap-x-24">
        <div className="md:w-1/2 flex flex-col gap-y-6  child:text-dark_shade ">
          <span className="text-right text-lg font-Shabnam_M ">
            Set Coffee{" "}
          </span>
          <p className="text-4xl text-right font-Shabnam_B max-w-[400px] leading-[50px]">
            داستان قهوه ست
          </p>
          <p className="text-justify text-lg  ">
            تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان ضامن این
            ویژگی‌هاست. از ویژگی‌های بارز مجموعه قهوه ست واردات مواد اولیه راسا
            به وسیله مدیریت مجموعه و انتخاب بهترین مواد اولیه جهت تولید قهوه
            است.
          </p>
          <p className=" text-lg text-justify ">
            مجموعه قهوه ست اولین مجموعه مرتبط با قهوه در ایران است که در سال
            2007 به عضویت انجمن تخصصی قهوه اروپا (Speciality coffee association
            of Europe) در آمده است و بسیاری از دوره‌های مربوط به فرآوری قهوه را
            مدیریت این مجموعه به صورت تخصصی در کارگاه‌های آموزشی این انجمن و
            همچنین کارگاه‌های تخصصی فرآوری قهوه به خصوص در زمینه بو دادن
            قهوه(Roasting) را در کشور آمریکا که از پیشگامان این صنعت است را
            گذرانده است. اکنون با پشتوانه دستاوردهای گذشته و تکنولوژی روز دنیا
            وارد مرحله تولید قهوه به صورت صنعتی و گسترده شده‌ایم و مفتخریم اعلام
            کنیم که «قهوه ست» از این پس یک نام تجاری صنعتی در صنعت قهوه ایران
            است.
          </p>
        </div>
        <div className="md:w-1/2 md:!-mt-32 child:mt-5">
          <p className="text-justify text-lg  ">
            مسیری را که بنیان‌گذاران «قهوه ست» در دهه 20 شمسی آغاز کرده‌اند
            اکنون وارد مرحله جدیدی شده است و مفتخریم اعلام کنیم در بهمن ماه 94
            موفق به اخذ مجوزهای مربوطه از وزارت بهداشت درمان و آموزش پزشکی و
            سازمان غذا دارو شده‌ایم و تولید سنتی و محدود قهوه را تبدیل به تولید
            صنعتی و انبوه کرده‌ایم.
          </p>
          <p className=" text-lg text-justify ">
            از دیگر افتخارات مجموعه «قهوه ست» اخذ مدرک دیپلم دانش قهوه از انجمن
            قهوه تخصصی اروپا در فروردین ماه سال 95 است. (SCAE Coffee Diploma)
          </p>
          <p className="text-lg text-justify">
            امید داریم با کسب دانش روز دنیا در این صنعت ارتقا کیفیت و تنوع محصول
            در حد استانداردهای جهانی را در آینده‌ای نزدیک شاهد باشیم. صاحب
            امتیاز: شرکت فنجان داغ خوارزمی
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
