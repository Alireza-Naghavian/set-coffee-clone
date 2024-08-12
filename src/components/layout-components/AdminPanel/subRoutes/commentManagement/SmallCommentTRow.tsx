import Table from "@/components/UI/Table/Table";
import { CommentModeltype } from "@/types/models/comment.type";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdDelete, MdOutlineDownloadDone } from "react-icons/md";

function SmallCommentTRow({ comment }: { comment: CommentModeltype }) {
  return (
    <Table.Row
      className="my-1 child:my-auto
      !flex md:!hidden gap-x-4 h-full   bg-slate-200 px-4  border-b py-2"
      variant="singleHead"
    >
      <td className="font-Shabnam_B ">{comment?.userName}</td>
      <td className="flex flex-col w-full ">
        
        <span className="text-right flex  items-center my-auto gap-x-4  mr-auto !mb-4">
          <button
            // onClick={() => setIsDeleteOpen(true)}
            className="  my-auto h-full text-3xl text-red-500   w-fit flex justify-center"
          >
            <MdDelete />
          </button>
          <button
            // onClick={() => setIsDeleteOpen(true)}
            className="  my-auto h-full text-3xl text-blue-500   w-fit flex justify-center"
          >
            <FaEdit />
          </button>
        </span>
        <span
          className="flex flex-col gap-y-2 child:pt-1  child:flex 
                child:justify-between child:items-center child:w-full
                 child:text-sm  child:pb-[2px]  child:child:pb-[2px]"
        >
          <span className="font-Shabnam_B">
            <span>امتیاز ثبت شده:</span>
            <span>{comment.score.toLocaleString("fa-Ir")} امتیاز</span>
          </span>
          <span className="font-Shabnam_B">
            <span>محصول:</span>
            {comment.productData && (
              <Link
                href={`/categories/${comment.productData[0]._id}`}
                className="line-clamp-1 text-sm"
              >
                {comment.productData[0]?.title}
              </Link>
            )}
          </span>
          <span className="font-Shabnam_B">
            <span>تاریخ ثبت:</span>
            <span className="">
              {new Date(comment.date).toLocaleDateString("fa-Ir")}
            </span>
          </span>
          <span className="font-Shabnam_B">
            <span>پاسخ / تایید:</span>
            <div className="flex items-center gap-x-4">
              <button
                // onClick={()=>setIsRoleOpen(true)}
                className="text-2xl text-blue-500"
              >
                <ImReply />
              </button>
              <button
                // onClick={()=>setIsRoleOpen(true)}
                className="text-4xl text-green-500 "
              >
                <MdOutlineDownloadDone />
              </button>
            </div>
          </span>
        </span>
      </td>
    </Table.Row>
  );
}

export default SmallCommentTRow;
