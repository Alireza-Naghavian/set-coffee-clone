import FilteredCategory from "@/components/Utils-components/FIlter/FilteredCategory";
import "rc-slider/assets/index.css";
function MainShopPage() {
  return (
    <div className="relative  child:sm:px-10 child:px-4">
      <div
        className={` w-full relative mx-auto  
           lg:h-[473px] md:h-[100px]  flex-center headerWrapper text-white`}
      >
        <div
          className="max-w-[1280px] max-h-[243px] mt-[115px] w-full h-[243px] 
           child:text-white flex flex-col items-center py-[20px]"
        >
          <h1 className="text-[clamp(24px,4vw,68px)] font-Shabnam_B text-center">
            فروشگاه
          </h1>
          {/* category list */}
          <ul className="flex-center mt-2.5 flex-wrap w-full  child:flex child:flex-col gap-x-8 gap-y-6 child:gap-y-1">
            <li>
              <span className="text-white font-Shabnam_M">فروش سازمانی</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">EXOTIC SERIES</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">هورکا</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                COMMERCIAL COFFEE
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">PREMIUM COFFEE</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                SPECIALTY COFFEE
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">EXOTIC</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                قهوه های خاص و محدود
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">
                WORLD CLASS SPECIALTY
              </span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
            <li>
              <span className="text-white font-Shabnam_M">کپسول قهوه</span>
              <span className="text-mute  text-right font-Shabnam_M">
                ۴ محصول
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex gap-x-8   bg-red-400 py-12">
        {/* filter component must be spilt it */}
       <FilteredCategory/>
        <div className=" bg-white px-12 w-full">ss</div>
      </div>
    </div>
  );
}

export default MainShopPage;
