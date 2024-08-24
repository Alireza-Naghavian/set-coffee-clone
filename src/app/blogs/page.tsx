import AllBlogs from "@/components/layout-components/Blogs/AllBlogs";
import React, { Suspense } from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import dataParser from "@/utils/dataParser/dataParser";
export const revalidate = 1800;
async function page() {
  await dbConnection();
  const allBlogs = await BlogsModel.find({}, "-__v -updatedAt");
  return (
    <QueryClientProviderWrapper>
      <Suspense>
        <main className="relative max-w-[1920px]">
          <AllBlogs allBlogs={dataParser(allBlogs)} />
        </main>
      </Suspense>
    </QueryClientProviderWrapper>
  );
}

export default page;
