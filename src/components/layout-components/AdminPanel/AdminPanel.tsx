import { GrowthDataType } from '@/types/auth.type';
import { CartType } from '@/types/models/cart.type';
import FirstPageLayout from './subRoutes/FirstPageLayout/FirstPageLayout';
import HeaderAdminLayout from './subRoutes/Products/HeaderAdminLayout';
function AdminPanel({allOrders,growthData}:{allOrders:CartType[],growthData:GrowthDataType}) {

  return (
    <div className='text-dark_shade '>
  <HeaderAdminLayout title='آمار و ارقام'>
   <FirstPageLayout growthData={growthData} allOrders={allOrders}/>
  </HeaderAdminLayout>
    </div>
  )
}

export default AdminPanel