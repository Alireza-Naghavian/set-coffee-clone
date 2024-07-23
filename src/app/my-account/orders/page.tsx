import OrderLists from '@/components/layout-components/UserPanelPage/subRoutes/OrderLists'
import { getUser } from '@/utils/auth/authHelper';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
    const user = await getUser();
  if(!user) return redirect("/register-login")
    return (
    <OrderLists />
  )
}

export default page