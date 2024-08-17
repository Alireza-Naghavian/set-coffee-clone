import { useAlert } from "@/app/context/AlertContext";
import Table from "@/components/UI/Table/Table";
import useDeleteComment from "@/hooks/comments/useDeleteComment";
import useEditCommentData from "@/hooks/comments/useEditCommentData";
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
import EditCommentForm from "./EditCommentForm";
import ReplyModalForm from "./ReplyModalForm";
function LargeCommentTRow({ comment }: { comment: CommentModeltype }) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [status, setStatus] = useState<boolean>(comment.isAccept);
  const { isRemoveLoading, removeComment } = useDeleteComment();
  const {showAlert} = useAlert();
 
  const { editComment, isOperateLoading } = useEditCommentData();
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
  const removeHandler = async (identifier: string) => {
    if (comment._id === undefined) return;
    try {
      await removeComment(identifier, {
        onSuccess: (data: any) => {
          showAlert("success",data.message)
          setIsDeleteOpen(false);
        },
        onError: (err: any) => {
          setIsDeleteOpen(false);
          showAlert("error",err?.reponse?.data?.message)
     
        },
      });
    } catch (error: any) {
      console.log(error?.reponse?.data?.message);
    }
  };
  return (
    <Table.Row
      variant="singleHead"
      className=" !hidden md:!grid mx-auto p-4 py-2 h-full "
    >
      <td className="w-full h-full flex-center">
        <p
          className={` text-white w-[70%] mx-auto
           rounded-md h-[30px] my-auto flex-center ${
             comment.isAccept ? "bg-green-800" : "bg-slate-700"
           }`}
        >
          {comment?.userName}
        </p>
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_M">
          {comment.score.toLocaleString("fa-Ir")} امتیاز
        </span>
      </td>
      <td>
        {comment.productData && (
          <Link
            href={`/categories/${comment.productData[0]._id}`}
            className="text-sm font-Shabnam_M line-clamp-3 text-mute "
          >
            {comment.productData[0]?.title}
          </Link>
        )}
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_M">
          {new Date(comment.date).toLocaleDateString("fa-Ir")}
        </span>
      </td>
      <td className=" flex items-center gap-x-4">
        <button
          onClick={() => setIsReplyOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
          <ImReply />
        </button>
        <button
          onClick={() => setIsStatusOpen(true)}
          className="text-3xl font-Shabnam_B text-green-500 mx-auto  w-fit flex justify-center "
        >
          <MdOutlineDownloadDone />
        </button>
      </td>
      <td className=" flex items-center gap-x-4">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
        <button
          onClick={() => setIsEditOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
          <FaEdit />
        </button>
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

export default LargeCommentTRow;
