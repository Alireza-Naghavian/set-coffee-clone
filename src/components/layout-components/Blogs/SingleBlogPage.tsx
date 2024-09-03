"use client";
import TextLoader from "@/components/UI/loader/TextLoader";
import useGetBlog from "@/hooks/blogs/useGetBlog";
import { MainBlogType } from "@/types/blog.type";
import { useParams } from "next/navigation";
import styles from "./blog.module.css";
function SingleBlogPage({ blogData }: { blogData: MainBlogType }) {
  const params = useParams<{ blogId: string }>();
  const {
    blogData: blog,
    isBlogLoading,
  }: { blogData: MainBlogType; isBlogLoading: boolean } = useGetBlog(
    params.blogId,
    blogData
  );
  if (isBlogLoading) {
    return <TextLoader loadingCondition={isBlogLoading} />;
  }
  return (
    <div className="flex flex-col  xs:px-6 sm:px-14 py-10 w-full relative">
      <div className="text-center flex flex-col gap-y-4 font-Shabnam_B text-dark_shade ">
        <span className="text-center text-mute text-base py-2">
          نویسنده:&nbsp;{blog.provider.userName}
        </span>
        <span className="text-center text-mute text-base py-2">
          تاریخ انتشار:&nbsp;
          {blog.createdAt &&
            new Date(blog.createdAt).toLocaleDateString("fa-Ir")}
        </span>
      </div>
      <div className="mt-14">
        <div
          className={`flex flex-col gap-y-8 mt-6 leading-8 font-Shabnam_M  ${styles.blogContainer}`}
        >
          <div dangerouslySetInnerHTML={{ __html: blog.longDesc }} />
        </div>
      </div>
    </div>
  );
}

export default SingleBlogPage;
