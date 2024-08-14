import { MessagesType } from "@/types/models/ticket.type";
import api from "../httpServices";

export const getAllComments = async () => {
  return api.get("/comments").then((data) => data.data);
};
export const deleteComment = async (commentId: string) => {
  return api.delete(`/comments/${commentId}`).then((response) => response.data);
};
export const changeCommentStatus = async({commentId,data}:{commentId: string,data:{isAccept:boolean,reply:string}})=>{
return api.patch(`/comments/${commentId}`,data).then((reposne)=>reposne.data)
}

export const AnswerComment = async({commentId,data}:{commentId:string,data:MessagesType})=>{
  return api.post(`/comments/answer/${commentId}`,data).then(({data})=>data)
}
