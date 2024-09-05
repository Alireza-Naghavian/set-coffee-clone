import MainBtn from "@/components/UI/Buttons/MainBtn";
import { CommentModeltype } from "@/types/models/comment.type";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import CommentForm from "../Forms/CommentForm";
import CommentCard from "./CommentCard";
import styles from "./productDetails.module.css";
type FilterCommentsType = {
  filterAcceptableComments: CommentModeltype[];
  commentFor: string;
  productId: string;
};

function ProductComments({
  filterAcceptableComments,
  commentFor,
  productId,
}: FilterCommentsType) {
  const [showMore, setShowMore] = useState<number>(4);
  const hasMoreComments = showMore <= filterAcceptableComments?.length;

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
                onClick={() => setShowMore((prev) => prev + 4)}
              >
                <span>مشاهده بیشتر</span>
                <FaChevronDown />
              </MainBtn>
            )}
            {filterAcceptableComments.length > 0 && !hasMoreComments && (
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

export default ProductComments;
