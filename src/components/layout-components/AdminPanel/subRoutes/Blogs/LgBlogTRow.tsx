import Table from "@/components/UI/Table/Table";
import { MainBlogType } from "@/types/blog.type";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal";
import useRemoveBlog from "@/hooks/blogs/useRemoveBlog";

function LgBlogTRow({ blog, index }: { blog: MainBlogType; index: number }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { deleteBlog, isRemoveLoading } = useRemoveBlog();
  const removeHandler = async () => {
    try {
      if (blog._id === undefined) return;
      await deleteBlog(blog._id, {
        onSuccess: () => setIsDeleteOpen(false),
        onError: () => setIsDeleteOpen(false),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Table.Row variant="singleHead" className=" !hidden md:!grid p-4 ">
      <td className="font-Shabnam_M">{index.toLocaleString("fa-Ir")}</td>
      <td>
        <span className="text-sm line-clamp-3 font-Shabnam_M px-2 ">
          {blog?.title}
        </span>
      </td>
      <td className="   w-[95%]   truncate line-clamp-1">
        <p className="text-sm relative  font-Shabnam_M px-2 ">
          {blog?.provider?.userName}
        </p>
      </td>
      <td>
        <span className="text-base text-mute ">
          {blog.createdAt &&
            new Date(blog?.createdAt).toLocaleDateString("fa-Ir")}
        </span>
      </td>

      <td className="ml-12">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="text-2xl text-red-500 mx-auto  w-fit flex justify-center "
        >
          <MdDelete />
        </button>
      </td>
      {blog._id !== undefined && (
        <DeleteModal
          identifier={blog?._id}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={() => setIsDeleteOpen(false)}
          isLoading={isRemoveLoading}
          removeHandler={removeHandler}
          subjectTitle={"مقاله"}
        />
      )}
    </Table.Row>
  );
}

export default LgBlogTRow;
