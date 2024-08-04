import BlogCard from "@/components/Shared-components/BlogCard/BlogCard";
import React from "react";
import BlogsPagination from "./BlogsPagination";

function AllBlogs() {
  return (
    <div className="flex justify-between flex-col w-full mt-8 px-4 sm:px-8 ">


    <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 mx-auto gap-y-8 ">
      <BlogCard
        cover="/images/mocaPot_1.jpg"
        shortDesc="سرو کردن قهوه در خانه می تواند برای یک صبحانه ساده، لذت بردن از یک استراحت کوتاه مدت، مراسم مهمانی،"
        title="چطور یک قهوه موکاپات عالی تهیه کنیم؟"
      />
      <BlogCard
        cover="/images/mocaPot_2.jpg"
        shortDesc="سرو کردن قهوه در خانه می تواند برای یک صبحانه ساده، لذت بردن از یک استراحت کوتاه مدت، مراسم مهمانی،"
        title="چطور یک قهوه موکاپات عالی تهیه کنیم؟"
      />
      <BlogCard
        cover="/images/coffeeMakers.jpg"
        shortDesc="سرو کردن قهوه در خانه می تواند برای یک صبحانه ساده، لذت بردن از یک استراحت کوتاه مدت، مراسم مهمانی،"
        title="چطور یک قهوه موکاپات عالی تهیه کنیم؟"
      />
      <BlogCard
        cover="/images/coffeeBeans.jpg"
        shortDesc="سرو کردن قهوه در خانه می تواند برای یک صبحانه ساده، لذت بردن از یک استراحت کوتاه مدت، مراسم مهمانی،"
        title="چطور یک قهوه موکاپات عالی تهیه کنیم؟"
      />
      <BlogCard
        cover="/images/mocaPot_1.jpg"
        shortDesc="سرو کردن قهوه در خانه می تواند برای یک صبحانه ساده، لذت بردن از یک استراحت کوتاه مدت، مراسم مهمانی،"
        title="چطور یک قهوه موکاپات عالی تهیه کنیم؟"
      />
    </div>
    <div className="mt-4 flex-center w-full">
<BlogsPagination/>
    </div>
    </div>
  );
}

export default AllBlogs;
