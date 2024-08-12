"use client";
import Table from "@/components/UI/Table/Table";
import useGetAllComments from "@/hooks/comments/useGetAllComments";
import { CommentModeltype } from "@/types/models/comment.type";
import React from "react";
import HeaderAdminLayout from "../Products/HeaderAdminLayout";
import LargeCommentTRow from "./LargeCommentTRow";
import SmallCommentTRow from "./SmallCommentTRow";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import { FaCommentAlt } from "react-icons/fa";
import Loader from "@/components/UI/loader/Loader";
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("@/components/UI/Table/Table"), {
    ssr: false,
  });
function Comments({ CommentsData }: { CommentsData: CommentModeltype }) {
  const { comments, isCommentsLoading } = useGetAllComments(CommentsData);
  console.log(comments);
  if(isCommentsLoading) {
    return <div className="flex items-center gap-x-2 mt-4">
        <span><Loader loadingCondition={isCommentsLoading}/></span>
        <span>درحال بارگزاری...</span>
    </div>
  }
  return (
    <HeaderAdminLayout title="مدیریت comment ها">
      <div className="lg:h-[480px] overflow-y-auto">
        <NoSSR variant="singleHead" className="w-full relative mt-10 table">
          {comments?.length > 0 ? (
            <Table.Header variant="singleHead" className="hidden md:block">
              <tr
                className="grid grid-cols-6  rounded-lg  child:text-center p-4
                    bg-main_brown text-white"
              >
                <th>کاربر</th>
                <th>امتیاز ثبت شده</th>
                <th>محصول</th>
                <th>تاریخ ثبت</th>
                <th>پاسخ/تایید</th>
                <th>حذف/ویرایش</th>
              </tr>
            </Table.Header>
          ) : (
            <EmptyResult
              icon={<FaCommentAlt />}
              firstDesc="هنوز هیچ کامنتی توسط کاربر ثبت نشده است"
              secondDesc=""
              title="کامنتی وجود ندارد"
              addressLink={false}
            />
          )}
          <Table.Body
            variant="singleHead"
            className="child:md:grid-cols-6 grid-cols-2"
          >
            {comments.map((comment: CommentModeltype, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/* large table row */}

                  <LargeCommentTRow comment={comment} />
                </React.Fragment>
              );
            })}
            {comments.map((comment: CommentModeltype, index: number) => {
              return (
                <React.Fragment key={comment._id}>
                  {/* large table row */}

                  <SmallCommentTRow comment={comment} />
                </React.Fragment>
              );
            })}
       
      
   
          </Table.Body>
        </NoSSR>
      </div>
    </HeaderAdminLayout>
  );
}

export default Comments;
