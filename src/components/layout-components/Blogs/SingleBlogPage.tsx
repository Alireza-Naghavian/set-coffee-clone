import { MainBlogType } from "@/types/blog.type";
import styles from "./blog.module.css";
function SingleBlogPage({ blogData }: { blogData: MainBlogType }) {
  return (
    <div className="flex flex-col  xs:px-6 sm:px-14 py-10 w-full relative">
      <div className="text-center flex flex-col gap-y-4 font-Shabnam_B text-dark_shade ">
        <span className="text-center text-mute text-base py-2">
          نویسنده:&nbsp;{blogData?.provider?.userName}
        </span>
        <span className="text-center text-mute text-base py-2">
          تاریخ انتشار:&nbsp;
          {blogData?.createdAt &&
            new Date(blogData?.createdAt).toLocaleDateString("fa-Ir")}
        </span>
      </div>
      <div className="mt-14">
        <div
          className={`flex flex-col gap-y-8 mt-6 leading-8 font-Shabnam_M  ${styles.blogContainer}`}
        >
          <div dangerouslySetInnerHTML={{ __html: blogData.longDesc }} />
        </div>
      </div>
    </div>
  );
}

export default SingleBlogPage;
