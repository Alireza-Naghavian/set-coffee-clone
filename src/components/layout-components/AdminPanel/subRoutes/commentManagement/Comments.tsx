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
import TextLoader from "@/components/UI/loader/TextLoader";
const NoSSR = dynamic(() => import("@/components/UI/Table/Table"), {
  ssr: false,
});
function Comments() {
  const { comments, isCommentsLoading } = useGetAllComments();
  return (
    <HeaderAdminLayout title="مدیریت comment ها">
      <div className="h-[480px]  !overflow-y-auto">
        <NoSSR variant="singleHead" className="w-full relative mt-10 table">
          {comments?.allComments?.length > 0 ? (
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
          ) : isCommentsLoading ? (
            isCommentsLoading && (
              <TextLoader loadingCondition={isCommentsLoading} />
            )
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
            {comments?.allComments?.map(
              (comment: CommentModeltype, index: number) => {
                return (
                  <React.Fragment key={index}>
                    {/* large table row */}
                    <LargeCommentTRow comment={comment} />
                  </React.Fragment>
                );
              }
            )}
            {comments?.allComments?.map(
              (comment: CommentModeltype, index: number) => {
                return (
                  <React.Fragment key={comment._id}>
                    {/* large table row */}
                    <SmallCommentTRow comment={comment} />
                  </React.Fragment>
                );
              }
            )}
          </Table.Body>
        </NoSSR>
      </div>
    </HeaderAdminLayout>
  );
}

export default Comments;
