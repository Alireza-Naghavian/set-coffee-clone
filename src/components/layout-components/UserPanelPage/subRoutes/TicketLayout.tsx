"use client"
import React from 'react'
import SingleTicket from './SingleTicket'
import ReplyFormHandler from '../ReplyFormHandler'
import { TicketType } from '@/types/models/ticket.type'

function TicketLayout({ticketId,ticket}:{ticketId:string,ticket:TicketType}) {
  return (
    <>
    <SingleTicket ticketId={ticketId} >
    <ReplyFormHandler ticketId={ticketId} ticket={ticket} />
    </SingleTicket>
    </>
  )
}

export default TicketLayout