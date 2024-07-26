import { QueryClientProviderWrapper } from '@/app/context/QueryClientProvider'
import AccountDetail from '@/components/layout-components/UserPanelPage/subRoutes/AccountDetail'
import { getUser } from '@/utils/auth/authHelper'
import dataParser from '@/utils/dataParser/dataParser';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
    const user = await getUser();
    if(!user) return redirect("/register-login")
  return (

    <AccountDetail user={dataParser(user)} />

  )
}

export default page