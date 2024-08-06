import AdminPanel from '@/components/layout-components/AdminPanel/AdminPanel'
import dbConnection from '@/dbConfigs/db'
import { getUser } from '@/utils/auth/authHelper';
import dataParser from '@/utils/dataParser/dataParser';
import { notFound } from 'next/navigation';
import React from 'react'

async function page() {
    await dbConnection();
    const user = await getUser();
    if(user.role !== "ADMIN") return notFound();

  return (
<AdminPanel user={dataParser(user)}/>
  )
}

export default page