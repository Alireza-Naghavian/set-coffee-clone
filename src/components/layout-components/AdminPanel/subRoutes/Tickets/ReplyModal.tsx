import SingleTicket from '@/components/layout-components/UserPanelPage/subRoutes/SingleTicket'
import React from 'react'
import ReplyForm from './ReplyForm'
import { TicketType } from '@/types/models/ticket.type'

function ReplyModal({ticketId}:{ticketId:string}) {
  return (
<SingleTicket ticketId={ticketId}>
<ReplyForm ticketId={ticketId} />
</SingleTicket>
  )
}

export default ReplyModal