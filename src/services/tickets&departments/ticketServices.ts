import { MessagesType, TicketStatusType } from "@/types/models/ticket.type";
import api from "../httpServices";

export const AddNewTicket = async (data:any) => {
  return  await api.post("/tickets", data).then((data) => data.data);
};
export const getSingleTicketData = async (ticketId:string) => {
  return  await api.get(`/tickets/${ticketId}`).then((response)=>response.data);
};

export const ReplyTicketMsg = async ({ticketId,data}:{ticketId:string,data:any})=>{
  return await api.post(`/tickets/${ticketId}`,data).then(({data})=>data)
}

export const getAllTickets= async()=>{
  return api.get("/tickets").then((response)=>response.data)
}

export const deleteTicket = async(ticketId:string)=>{
  return api.delete(`/tickets/${ticketId}`).then((reponse)=>reponse.data)
}
export const changeTicketSt = async ({ticketId,data}:{ticketId:string,data:TicketStatusType})=>{
try {
  return api.patch(`/tickets/${ticketId}`,data).then(response=>response.data)
} catch (error) {
  return null
}
}

export const replyAdminTicket = async({ticketId,data}:{ticketId:string,data:MessagesType})=>{
  try {
 return api.post(`/tickets/answer/${ticketId}`,data).then(response=>response.data)    
  } catch (error) {
    return null
  }
}
