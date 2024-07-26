import Link from "next/link";
type EmptyResultType ={
    icon:any,
    title:string,
    firstDesc:string
    secondDesc:string
}
function EmptyResult({icon,title,firstDesc,secondDesc}:EmptyResultType) {
  return (
    <div className="w-full relative flex-center h-full my-auto mt-4 flex-col">
      <div className="child:text-[100px] md:child:text-[150px] child:text-mute/55">
      {icon}
      </div>
      <div className=" flex flex-col ">
        <p className=" text-2xl md:text-[clamp(12px,2vw,22px)] px-2 text-center text-dark_shade font-Shabnam_B">
        {title}
        </p>
        <p className="md:text-lg text-mute text-center px-2 mt-2">
        {firstDesc}
        </p>
        <p className="md:text-lg text-mute text-center px-2">
         {secondDesc}
        </p>
      </div>
      <div className="flex-center mx-auto mt-6">
        <Link
          href={"/categories"}
          className="px-4 py-2 text-center
                 text-white bg-main_green tr-300 hover:bg-main_green_dark"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </div>
  );
}

export default EmptyResult;
