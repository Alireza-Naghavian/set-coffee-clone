import { OfferModelType } from "@/types/models/offers.type";
import api from "../httpServices";

export const createNewOffCode = async ({ data }: { data: OfferModelType }) => {
  return api.post("/offers", data).then((response) => response.data);
};

export const getAllOffers = async () => {
  return api.get("/offers").then((response) => response.data);
};
export const removeOfferCode = async (offerId: string) => {
  return api.delete(`/offers/${offerId}`).then((response) => response.data);
};
export const useOfferCode = async ({code}:{code:string})=>{
  return api.patch(`/offers`,{code}).then((response)=>response.data)
}
