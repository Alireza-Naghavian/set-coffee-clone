import Table from "@/components/UI/Table/Table";
import { CommentModeltype } from "@/types/models/comment.type";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { ImReply } from "react-icons/im";
import { MdDelete, MdOutlineDownloadDone } from "react-icons/md";
function LargeCommentTRow({ comment }: { comment: CommentModeltype }) {
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
        {comment.productData && 

        <Link href={`/categories/${ comment.productData[0]._id}`} className="text-sm font-Shabnam_M line-clamp-3 text-mute ">
          {comment.productData[0]?.title}
        </Link>
        }
      </td>
      <td>
        <span className="text-base text-mute font-Shabnam_M">
          {new Date(comment.date).toLocaleDateString("fa-Ir")}
        </span>
      </td>
      <td className=" flex items-center gap-x-4">
        <button
          // onClick={() => setIsEditOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
          <ImReply />
        </button>
        <button
          // onClick={() => setIsEditOpen(true)}
          className="text-3xl font-Shabnam_B text-green-500 mx-auto  w-fit flex justify-center "
        >
          <MdOutlineDownloadDone />
        </button>
      </td>
      <td className=" flex items-center gap-x-4">
        <button
          // onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
        <button
          // onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-blue-500 mx-auto  w-fit flex justify-center "
        >
       <FaEdit />
        </button>
      </td>
      {/* <DeleteModal
        identifier={product._id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={() => setIsDeleteOpen(false)}
      />
      <EditProdModal
        product={product}
        isEditOpen={isEditOpen}
        setIsEditOpen={() => setIsEditOpen(false)}
      /> */}
    </Table.Row>
  );
}

export default LargeCommentTRow;
