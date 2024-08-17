import TicketLayout from '@/components/layout-components/UserPanelPage/subRoutes/TicketLayout';
import dbConnection from '@/dbConfigs/db';
import TicketModel from '@/models/tickets/ticket';
import dataParser from '@/utils/dataParser/dataParser';
import { isValidObjectId } from 'mongoose';
import { notFound } from 'next/navigation';
  async function page({params}:{params:{ticketId:string}}) {
    await dbConnection();
  const {ticketId} = params
    if(!isValidObjectId(ticketId)) return notFound();
    const ticket = await TicketModel.findOne({ _id: ticketId }, "-__v")
    .populate("messages.sender", "userName role").populate("adminMessages.sender","userName role")
    .populate("user", "userName")
    .lean();
  return (
<TicketLayout ticketId={ticketId} ticket={dataParser(ticket)}/>
  )
}

export default page