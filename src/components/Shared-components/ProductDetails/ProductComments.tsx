import React from "react";
import styles from "./productDetails.module.css";
import Image from "next/image";
import { FaChevronCircleDown, FaChevronDown, FaStar } from "react-icons/fa";
import CommentForm from "../Forms/CommentForm";
import MainBtn from "@/components/UI/Buttons/MainBtn";
function ProductComments() {
  return (
    <>
      <div className={styles.commentSectionWrapper}>
        {/* comments list */}
        <div className="w-full  ">
          <h4 className="font-Shabnam_B text-[14px]  text-dark_shade mt-2">
            92 دیدگاه برای دانه قهوه CAFFÈ CREMA – CLASSICO (کلاسیک – A70 R30)
          </h4>
          {/* comments */}
          <div className="flex w-full flex-col mt-2">
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
    
          </div>
          <div className="  mr-4 mt-2  flex-center">
            <MainBtn size="small"  variant="roundedSecondary"  className="flex items-center justify-center gap-x-2">
              <span>مشاهده بیشتر</span>
              <FaChevronDown/>
            </MainBtn>
          </div>
        </div>
        <div className="w-full  ">
          <CommentForm/>
        </div>
      </div>
    </>
  );
}

const CommentCard = () => {
  return (
    <>
      <div className="max-h-[105px]  mt-4 flex items-center w-full px-3 py-4 border-b-2 last:border-b-0">
        <div className="py-6 flex items-start w-full  gap-x-4">
          {/* user profile */}
          <div className="w-[80px] h-[80px] pl-2  rounded-full">
            <Image
              src={"/images/user-sample.png"}
              className=" object-cover rounded-full "
              width={800}
              priority={false}
              height={800}
              quality={60}
              alt="user"
            />
          </div>

          <div className="flex flex-col w-full justify-center">
            <div className="flex justify-between w-full flex-wrap">
              <div className="flex items-start h-full gap-x-2">
                <span className="font-Shabnam_M text-base text-dark_shade">
                  alirezangh
                </span>
                <span>-</span>
                <span className="text-mute font-Shabnam_M tracking-tighter">
                  ۱۲ دی ۱۴۰۱
                </span>
              </div>
              {/* rate us from user */}
              <div className="text-base flex child:text-goldColor">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              
            </div>
            {/* comment message */}
            <div className="w-full child:text-mute child:font-Shabnam_M max-w-[95%] mt-2">
              <p className="text-wrap">
              این نوع قهوه طعم ترشی نداره و به همین علت برای من بسیار جذابه.عااااالی بود
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComments;
