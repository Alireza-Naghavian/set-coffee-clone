import AdminPanel from '@/components/layout-components/AdminPanel/AdminPanel';
import dbConnection from '@/dbConfigs/db';
import CartModel from '@/models/cart/cart';
import { getUser } from '@/utils/auth/authHelper';
import dataParser from '@/utils/dataParser/dataParser';
import { notFound } from 'next/navigation';

async function page() {
    await dbConnection();
    const user = await getUser();
    if(user?.role !== "ADMIN") return notFound();

    const allOrders = await CartModel.find({},"-__V -updatedAt").sort({createdAt:1})

  return (
<AdminPanel allOrders={dataParser(allOrders)}/>
  )
}

export default page