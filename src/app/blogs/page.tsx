import AllBlogs from "@/components/layout-components/Blogs/AllBlogs";
import dbConnection from "@/dbConfigs/db";
import BlogsModel from "@/models/blogs/blogs";
import dataParser from "@/utils/dataParser/dataParser";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
export const revalidate = 1800;
async function page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  await dbConnection();
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "8", 10);
  const skip = (page - 1) * limit;

  const allBlogs = await BlogsModel.find({}, "-__v -updatedAt")
    .skip(skip)
    .limit(limit);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    initialData: dataParser(allBlogs),
    queryFn: async () =>
      await BlogsModel.find({}, "-__v -updatedAt").skip(skip).limit(limit),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <QueryClientProviderWrapper>
      <Suspense>
        <HydrationBoundary state={dataParser({ dehydratedState })}>
          <main className="relative max-w-[1920px]">
            <AllBlogs allBlogs={dataParser(allBlogs)} />
          </main>
        </HydrationBoundary>
      </Suspense>
    </QueryClientProviderWrapper>
  );
}

export default page;
