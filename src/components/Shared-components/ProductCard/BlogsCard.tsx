import { customeBlurDataURL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import styles from "./productCard.module.css";
export type BlogType = {
  [key: string]: string;
};
function BlogsCard({
  publishDay,
  PublishMonth,
  category,
  title,
  cover,
  identifier
}: BlogType) {
  return (
    <>
    <div
      className={`!overflow-hidden relative  w-full  mx-auto  bg-black/20 cursor-pointer ${styles["cover-option"]}`}
    >
      <div className="flex flex-col h-full w-full justify-between absolute">
        {/* blog card badge */}
        <div
          className="w-[53px] h-[56px] child:font-Shabnam_M z-[8] lg:!z-50  child:text-lg 
                child:text-main flex flex-col
                    gap-y-px ml-auto 
                    justify-center shadow-md 
                    items-center bg-white mt-[15px] mr-[15px] "
        >
          <span>{publishDay}</span>
          <span>{PublishMonth}</span>
        </div>
        {/* blog card desc */}
        <Link
          href={`/blogs/${identifier}`}
          className="flex flex-col justify-center items-center pb-[32px] gap-y-[7px] z-[8] lg:!z-50"
        >
          <span className="w-10 h-6 flex-center bg-main_brown text-white text-xs font-Shabnam_M ">
            {category}
          </span>
          <div className="xl:px-[67px] px-6 font-Shabnam_B xl:text-2xl  md:text-lg sm:text-2xl text-xl  text-white text-center">
            {title}
          </div>
        </Link>
      </div>
      <div className={`${styles["overlay-cover"]} `}></div>
 <div className="w-[450px]  h-[200px] sm:!h-[390px] md:h-[350px] xl:h-[400px]">
 <Image
  fill
        src={cover}
        className={` w-full h-full object-cover ${styles['cover-image']}`}
        alt={title}
        placeholder="blur"
        blurDataURL={cover ? "data:image/png;base64," + cover: customeBlurDataURL}
      />
 </div>
     
    </div>
    </>

  );
}

export default BlogsCard;
