import MainBtn from "@/components/UI/Buttons/MainBtn";
import { CommentModeltype } from "@/types/models/comment.type";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown, FaRegStar, FaStar } from "react-icons/fa";
import CommentForm from "../Forms/CommentForm";
import styles from "./productDetails.module.css";
type FilterAcceptableCommentsType = {
  filterAcceptableComments: CommentModeltype[];
  commentFor: string;
  productId: string;
};

function ProductComments({
  filterAcceptableComments,
  commentFor,
  productId,
}: FilterAcceptableCommentsType) {
  const [showMore, setShowMore] = useState<number>(4);
  const hasMoreComments = showMore <= filterAcceptableComments.length;
  return (
    <>
      <div className={styles.commentSectionWrapper}>
        {/* comments list */}
        <div className="w-full  lg:order-1 order-2 mt-24 sm:mt-0  ">
          <h4 className="font-Shabnam_B text-[14px]  text-dark_shade mt-2">
            <span>دیدگاه برای &nbsp;</span>
            <span>{commentFor}</span>
          </h4>
          {/* comments */}
          <div className="flex w-full flex-col mt-2">
            {filterAcceptableComments?.length === 0 ? (
              <span className="text-center text-main_brown font-Shabnam_M mt-4">
                کامنتی برای این محصول ثبت نشده است
              </span>
            ) : (
              filterAcceptableComments
                ?.slice(0, showMore)
                ?.map((commentData) => {
                  return (
                    <CommentCard
                      commentData={commentData}
                      key={commentData._id}
                    />
                  );
                })
            )}
          </div>
          <div className="  mr-4 mt-2  flex-center">
            {filterAcceptableComments.length > 0 && hasMoreComments && (
              <MainBtn
                size="small"
                variant="roundedSecondary"
                className={`${filterAcceptableComments?.length == 0 && "hidden"}
                  flex items-center justify-center gap-x-2`}
                onClick={() => setShowMore((prev) => prev + 4)}>
                <span>مشاهده بیشتر</span>
                <FaChevronDown />
              </MainBtn>
            )}
            {filterAcceptableComments.length >0 && !hasMoreComments && (
              <span className="text-center text-main_brown font-Shabnam_M mt-4">
                تمامی کامنت ها نمایش داده شد.
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:order-2 order-1   ">
          <CommentForm productId={productId} />
        </div>
      </div>
    </>
  );
}

const CommentCard = ({ commentData }: { commentData: CommentModeltype }) => {
  return (
    <>
      <div className="sm:max-h-[105px]  mt-4 flex items-center w-full sm:px-3 sm:py-4 border-b-2 last:border-b-0">
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
            <div className="flex justify-between w-full gap-y-1 sm:gap-y-0 flex-wrap">
              <div className="flex items-start h-full flex-wrap gap-y-1 gap-x-2">
                <span className="font-Shabnam_M text-base text-dark_shade">
                  {commentData.userName}
                </span>
                <span>-</span>
                <span className="text-mute font-Shabnam_M tracking-tighter">
                  {new Date(commentData.date).toLocaleDateString("fa-Ir")}
                </span>
              </div>
              {/* rate us from user */}
              <div className="text-base flex ">
                {new Array(commentData?.score).fill(0).map((item, index) => {
                  return <FaStar className="text-goldColor" key={index} />;
                })}
                {new Array(5 - commentData?.score)
                  .fill(0)
                  .map((item, index) => {
                    return <FaRegStar key={index} />;
                  })}
              </div>
            </div>
            {/* comment message */}
            <div className="w-full child:text-mute child:font-Shabnam_M max-w-[95%] mt-2">
              <p className="text-wrap text-sm sm:text-base">
                {commentData.commentBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComments;
