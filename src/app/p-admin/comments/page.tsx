import Comments from '@/components/layout-components/AdminPanel/subRoutes/commentManagement/Comments'
import dbConnection from '@/dbConfigs/db'
import ProductModel from '@/models/categories&products/product';
import CommentModel from '@/models/comment/comment';
import { getUser } from '@/utils/auth/authHelper';
import dataParser from '@/utils/dataParser/dataParser';
import { notFound } from 'next/navigation';
import React from 'react'

 function page() {

  return (
    <main className='relative max-w-[1920px]'>
        <Comments />
    </main>
  )
}

export default page