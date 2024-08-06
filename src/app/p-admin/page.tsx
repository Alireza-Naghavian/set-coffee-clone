import AdminPanel from '@/components/layout-components/AdminPanel/AdminPanel';
import dbConnection from '@/dbConfigs/db';
import { getUser } from '@/utils/auth/authHelper';
import { notFound } from 'next/navigation';

async function page() {
    await dbConnection();
    const user = await getUser();
    if(user?.role !== "ADMIN") return notFound();

  return (
<AdminPanel/>
  )
}

export default page