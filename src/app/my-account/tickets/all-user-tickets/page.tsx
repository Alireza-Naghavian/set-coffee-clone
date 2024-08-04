import UserTicketList from '@/components/layout-components/UserPanelPage/subRoutes/UserTicketList'
import dbConnection from '@/dbConfigs/db'
import DeptModel from '@/models/department/department';
import TicketModel from '@/models/tickets/ticket';
import { getUser } from '@/utils/auth/authHelper';
import dataParser from '@/utils/dataParser/dataParser';
import React from 'react'

async function page() {
    await dbConnection();
    const user = await getUser();
    await DeptModel.find({}).limit(1)
    const allTickets = await TicketModel.find({user:user?._id}).populate("dept").lean();
  return (
   <UserTicketList allTickets={dataParser(allTickets)}/>
  )
}

export default page