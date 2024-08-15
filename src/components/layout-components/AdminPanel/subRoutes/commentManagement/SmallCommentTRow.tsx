import Table from "@/components/UI/Table/Table";
import { CommentModeltype } from "@/types/models/comment.type";
import { commentStatus } from "@/utils/constants";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdDelete, MdOutlineDownloadDone } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import SelectModal from "../modals/SelectModal";
import ReplyModalForm from "./ReplyModalForm";
import EditCommentForm from "./EditCommentForm";
import useDeleteComment from "@/hooks/comments/useDeleteComment";
import { toast } from "react-toastify";
import useEditCommentData from "@/hooks/comments/useEditCommentData";

function SmallCommentTRow({ comment }: { comment: CommentModeltype }) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [status, setStatus] = useState<boolean>(comment.isAccept);
  const { isRemoveLoading, removeComment } = useDeleteComment();
  const { editComment, isOperateLoading } = useEditCommentData();
  const removeHandler = async (identifier: string) => {
    if (comment._id === undefined) return;
    try {
      await removeComment(identifier, {
        onSuccess: (data: any) => {
          toast.success(data.message);
          setIsDeleteOpen(false);
        },
        onError: (err: any) => {
          setIsDeleteOpen(false);
          toast.error(err?.reponse?.data?.message);
        },
      });
    } catch (error: any) {
      console.log(error?.reponse?.data?.message);
    }
  };
  const statusHanlder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment._id === undefined) return;
    try {
      await editComment(
        { commentId: comment._id, data: { reply: "", isAccept: status } },
        {
          onSuccess: () => {
            setIsStatusOpen(false);
          },
          onError: () => {
            setIsStatusOpen(false);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Table.Row
      className="my-1 child:my-auto
      !flex md:!hidden  h-full   bg-slate-200 px-4  border-b py-2"
      variant="singleHead"
    >
      <td className={`font-Shabnam_B !ml-3 px-2 rounded-lg text-gray-200 ${comment.isAccept ? "bg-green-500" : "bg-slate-700"}`}>{comment?.userName}</td>
      <td className="flex flex-col w-full ">
        <span className="text-right flex  items-center my-auto gap-x-4  mr-auto !mb-4">
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="  my-auto h-full text-3xl text-red-500   w-fit flex justify-center"
          >
            <MdDelete />
          </button>
          <button
            onClick={() => setIsEditOpen(true)}
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
                onClick={() => setIsReplyOpen(true)}
                className="text-2xl text-blue-500"
              >
                <ImReply />
              </button>
              <button
                onClick={() => setIsStatusOpen(true)}
                className="text-4xl text-green-500 "
              >
                <MdOutlineDownloadDone />
              </button>
            </div>
          </span>
        </span>
      </td>
      <SelectModal
        isLoading={isOperateLoading}
        isOpen={isStatusOpen}
        setIsOpen={() => setIsStatusOpen(false)}
        modalTitle="تعیین وضعیت کامنت"
        options={commentStatus}
        subjectTitle="تایید/ رد"
        onSelectChange={(e) => setStatus(e.target.value)}
        value={status}
        selectHanlder={statusHanlder}
      />
      {comment._id !== undefined && (
        <DeleteModal
          identifier={comment._id}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={() => setIsDeleteOpen(false)}
          isLoading={isRemoveLoading}
          removeHandler={removeHandler}
          subjectTitle="کامنت"
        />
      )}
      <EditModal
        className="!h-auto"
        modalTitle="ارسال پاسخ"
        isOpen={isReplyOpen}
        setIsOpen={() => setIsReplyOpen(false)}
      >
        <ReplyModalForm
          data={comment}
          setIsEditOpen={() => setIsReplyOpen(false)}
        />
      </EditModal>
      <EditModal
        modalTitle="ویرایش کامنت"
        isOpen={isEditOpen}
        setIsOpen={() => setIsEditOpen(false)}
      >
        <EditCommentForm
          data={comment}
          setIsEditOpen={() => setIsEditOpen(false)}
        />
      </EditModal>
    </Table.Row>
  );
}

export default SmallCommentTRow;
