import api from "../httpServices";

export const getAllComments = async () => {
  return api.get("/comments").then(({ data }) => data);
};
