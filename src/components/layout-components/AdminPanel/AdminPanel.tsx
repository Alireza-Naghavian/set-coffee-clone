import { CartType } from '@/types/models/cart.type';
import SaleChart from './SaleChart';
import HeaderAdminLayout from './subRoutes/Products/HeaderAdminLayout';
import GrowthChart from './GrowthChart';
function AdminPanel({allOrders}:{allOrders:CartType[]}) {
  return (
    <div className='text-dark_shade '>
  <HeaderAdminLayout title='آمار فروش و نرخ رشد'>
    <SaleChart allOrders={allOrders}/>
    <GrowthChart/>
  </HeaderAdminLayout>
    </div>
  )
}

export default AdminPanel