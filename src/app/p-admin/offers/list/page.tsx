import OffersTable from '@/components/layout-components/AdminPanel/subRoutes/Offers/OffersTable'
import HeaderAdminLayout from '@/components/layout-components/AdminPanel/subRoutes/Products/HeaderAdminLayout'
import React from 'react'

function page() {
  return (
    <HeaderAdminLayout title='کد های تخفیف' >
    <OffersTable/>
 </HeaderAdminLayout>
  )
}

export default page