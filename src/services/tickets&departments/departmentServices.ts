import api from "../httpServices";

export const getAllDept = async () => {
  return  api.get("/department").then((data ) => data.data);
};
