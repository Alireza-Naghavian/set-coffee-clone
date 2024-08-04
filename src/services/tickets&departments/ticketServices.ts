import api from "../httpServices";

export const AddNewTicket = async (data:any) => {
  return  await api.post("/tickets", data).then((data) => data.data);
};
export const getSingleTicketData = async (ticketId:string) => {
  return  await api.get(`/tickets/${ticketId}`).then(({data}) => data.data);
};

export const ReplyTicketMsg = async ({ticketId,data}:{ticketId:string,data:any})=>{
  return await api.post(`/tickets/${ticketId}`,data).then(({data})=>data.data)
}
