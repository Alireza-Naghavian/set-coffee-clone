import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import SingleBlogPage from "@/components/layout-components/Blogs/SingleBlogPage";
import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import UserModel from "@/models/user/user";
import dataParser from "@/utils/dataParser/dataParser";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
type SingleBlogType = {
  blogId: string;
};
export const generateStaticParams = async () => {
  await dbConnection();
  await UserModel.findOne({}, "_id").limit(1);
  const initialProductData = await BlogsModel.find({})
    .populate("provider", "userName")
    .lean();
  const params = initialProductData.map((blog) => ({ _id: blog._id }));
  return params;
};
async function page({ params }: { params: SingleBlogType }) {
  await dbConnection();
  const { blogId } = params;
  if (!isValidObjectId(blogId)) return notFound();
  await UserModel.findOne({}, "_id").limit(1);
  const blogData = await BlogsModel.findOne({ _id: blogId }, "-__v -updatedAt")
    .populate("provider", "userName")
    .lean();
  return (
    <QueryClientProviderWrapper>
      <main className="relative max-w-[1920px]">
        <SingleBlogPage blogData={dataParser(blogData)} />
      </main>
    </QueryClientProviderWrapper>
  );
}

export default page;
