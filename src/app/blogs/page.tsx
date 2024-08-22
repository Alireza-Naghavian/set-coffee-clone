import AllBlogs from '@/components/layout-components/Blogs/AllBlogs'
import React from 'react'
import { QueryClientProviderWrapper } from '../context/QueryClientProvider'
import dbConnection from '@/dbConfigs/db'
import BlogsModel from '@/models/blogs/blogs';
import dataParser from '@/utils/dataParser/dataParser';

async function page() {
  await dbConnection();
  const allBlogs = await BlogsModel.find({},"-__v -updatedAt")
  return (
    <QueryClientProviderWrapper>
      
  <AllBlogs allBlogs={dataParser(allBlogs)}/>
    </QueryClientProviderWrapper>
  )
}

export default page