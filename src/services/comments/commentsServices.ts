import api from "../httpServices";

export const getAllComments = async () => {
  return api.get("/comments").then((data) => data.data);
};
export const deleteComment = async (commentId: string) => {
  return api.delete(`/comments/${commentId}`).then((response) => response.data);
};
