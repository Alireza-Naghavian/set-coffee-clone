import api from "../httpServices";

export const pushSubscription = async (subscription: any) => {


  return api.post("/subscribe", subscription).then((response) => response.data);
};
