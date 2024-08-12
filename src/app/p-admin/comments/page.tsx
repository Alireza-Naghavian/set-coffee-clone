import Comments from '@/components/layout-components/AdminPanel/subRoutes/commentManagement/Comments'
import dbConnection from '@/dbConfigs/db'
import ProductModel from '@/models/categories&products/product';
import CommentModel from '@/models/comment/comment';
import { getUser } from '@/utils/auth/authHelper';
import dataParser from '@/utils/dataParser/dataParser';
import { notFound } from 'next/navigation';
import React from 'react'

async function page() {
    await dbConnection();
    const user = await getUser();
    if(user?.role !== "ADMIN") return notFound();
    await ProductModel.findOne({},"_id").limit(1)
    const CommentsData = await CommentModel.find({},"-__v").populate("productData").lean();
  return (
    <main className='relative max-w-[1920px]'>
        <Comments CommentsData={dataParser(CommentsData)}/>
    </main>
  )
}

export default page