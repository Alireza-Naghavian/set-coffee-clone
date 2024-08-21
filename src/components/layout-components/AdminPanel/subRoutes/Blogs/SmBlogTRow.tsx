import Table from "@/components/UI/Table/Table";
import useRemoveBlog from "@/hooks/blogs/useRemoveBlog";
import { MainBlogType } from "@/types/blog.type";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";

function SmBlogTRow({ blog }: { blog: MainBlogType }) {
    const [isDeleteOpen,setIsDeleteOpen] = useState<boolean>(false);
    const {deleteBlog,isRemoveLoading} = useRemoveBlog();
    const removeHandler = async()=>{
        try {
            if(blog._id ===undefined) return
            await deleteBlog(blog._id,{
                onSuccess:()=>setIsDeleteOpen(false),
                onError:()=>setIsDeleteOpen(false)
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Table.Row
      className="my-1 child:my-auto
  !flex flex-col md:!hidden gap-y-1  h-full  w-full  bg-slate-200 px-4  border-b py-2"
      variant="singleHead"
    >
      <td className="flex items-center justify-between w-full">
        <span className="font-Shabnam_B "> {blog?.title}</span>
        <span className="text-right flex justify-between items-center my-auto gap-x-2  !mb-2">
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="mr-auto  my-auto h-full text-2xl text-red-500   w-fit flex justify-center"
          >
            <MdDelete />
          </button>
        </span>
      </td>
      <td className="flex flex-col w-full ">
        <span
          className="flex flex-col gap-y-4  child:flex 
              child:justify-between child:items-center child:w-full
               child:text-sm  child:pb-[2px] child:child:pb-[2px]"
        >
          <span className="">
            <span>عنوان:</span>
            <span className="xs:max-w-[150px] sm:max-w-[330px] text-wrap line-clamp-1">
              {blog?.title}
            </span>
          </span>
          <span className="">
            <span>نویسنده:</span>
            <span className="xs:max-w-[150px] sm:max-w-[330px] text-wrap line-clamp-1">
              {blog?.provider?.userName}
            </span>
          </span>
          <span className="">
            <span> تاریخ انتشار:</span>
            <span>
              {blog.createdAt &&
                new Date(blog?.createdAt).toLocaleDateString("fa-Ir")}
            </span>
          </span>
        </span>
      </td>
      {blog._id !== undefined && 
      <DeleteModal
      identifier={blog?._id}
      isDeleteOpen={isDeleteOpen}
      setIsDeleteOpen={() => setIsDeleteOpen(false)}
      isLoading={isRemoveLoading}
      removeHandler={removeHandler}
      subjectTitle={"مقاله"}
    />
     }
    </Table.Row>
  );
}

export default SmBlogTRow;
