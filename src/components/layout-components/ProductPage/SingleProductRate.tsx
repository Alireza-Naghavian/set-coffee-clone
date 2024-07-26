import { CommentModeltype } from '@/types/models/comment.type';
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';

const SingleProductRate = ({
    filterAcceptableComments,
    dynamicScore,
  }: {
    filterAcceptableComments: CommentModeltype[] | [];
    dynamicScore: number;
  }) => {
    return (
      <>
        <div className="flex   text-[26px] ">
          {filterAcceptableComments?.length ? (
            <>
              {Array(dynamicScore)
                .fill(0)
                .map((_, index) => {
                  return <FaStar key={index} className="text-[#FFCE00]" />;
                })}
              {Array(5 - dynamicScore)
                .fill(0)
                .map((_, index) => {
                  return <FaRegStar key={index} />;
                })}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar key={index} className="text-[#FFCE00]" />
              ))}
            </>
          )}
          <div className="flex-center my-auto  child:font-Shabnam_M child:text-base mr-2 mt-px child:text-main_green_dark">
            <p>
              (دیدگاه {filterAcceptableComments?.length.toLocaleString("fa-Ir")}
              کاربر)
            </p>
          </div>
        </div>
      </>
    );
  };

export default SingleProductRate