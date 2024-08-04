import SingleTicket from '@/components/layout-components/UserPanelPage/subRoutes/SingleTicket';
import dbConnection from '@/dbConfigs/db';
import TicketModel from '@/models/tickets/ticket';
import dataParser from '@/utils/dataParser/dataParser';
import { isValidObjectId } from 'mongoose';
import { notFound } from 'next/navigation';
async function page({params}:{params:{ticketId:string}}) {
  const {ticketId} = params
    await dbConnection();
   
    if(!isValidObjectId(ticketId)) return notFound();
    const userTickets = await TicketModel.findOne({_id:ticketId},"-__v").populate("user","userName").lean();
  return (
<SingleTicket ticketId={ticketId} initData={dataParser(userTickets)}/>
  )
}

export default page