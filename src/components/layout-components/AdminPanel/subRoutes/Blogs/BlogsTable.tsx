"use client";
import EmptyResult from "@/components/UI/EmptyResult/EmptyResult";
import TextLoader from "@/components/UI/loader/TextLoader";
import Table from "@/components/UI/Table/Table";
import useGetAllBlogs from "@/hooks/blogs/useGetAllBlogs";
import { MainBlogType } from "@/types/blog.type";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { TfiPackage } from "react-icons/tfi";
import LgBlogTRow from "./LgBlogTRow";
import SmBlogTRow from "./SmBlogTRow";
const NoSSR = dynamic(() => import("@/components/UI/Table/Table"), {
  ssr: false,
});
function BlogsTable() {
  const [limit, setLimit] = useState("10000");
  const { blogs, isBlogsLoading } = useGetAllBlogs({ limit });
  const { replace } = useRouter();
  const path = useSearchParams();
  const url = new URLSearchParams(path);
  useEffect(() => {
    setLimit(limit);
    url.set("limit", limit.toString());
    replace(`?${url.toString()}`);
  }, [limit,replace,setLimit,url]);
  if (isBlogsLoading) {
    return <TextLoader loadingCondition={isBlogsLoading} />;
  }
  return (
    <div className="h-[480px] overflow-y-auto">
      <NoSSR variant="singleHead" className="w-full relative mt-10 table">
        {blogs?.blogs?.length > 0 ? (
          <Table.Header variant="singleHead" className="hidden md:block">
            <tr
              className="grid grid-cols-5 rounded-lg  child:text-center p-4
                bg-main_brown text-white"
            >
              <th>شماره</th>
              <th>عنوان</th>
              <th>نویسنده</th>
              <th>تاریخ انتشار</th>
              <th>حذف</th>
            </tr>
          </Table.Header>
        ) : (
          <EmptyResult
            icon={<TfiPackage />}
            title="انبار محصولات خالی است"
            firstDesc="هیج محصول  ثبت نشده است"
            secondDesc="محصولات جدید را ابتدا  از قسمت افزودن ثبت کنید"
            addressLink={false}
          />
        )}
        <Table.Body
          variant="singleHead"
          className="child:md:grid-cols-5 grid-cols-2"
        >
          {blogs?.blogs?.map((blog: MainBlogType, index: number) => {
            return (
              <React.Fragment key={index}>
                <LgBlogTRow blog={blog} index={index + 1} />
              </React.Fragment>
            );
          })}
          {blogs?.blogs?.map((blog: MainBlogType, index: number) => {
            return (
              <React.Fragment key={index}>
                <SmBlogTRow blog={blog} />
              </React.Fragment>
            );
          })}
        </Table.Body>
      </NoSSR>
    </div>
  );
}

export default BlogsTable;
