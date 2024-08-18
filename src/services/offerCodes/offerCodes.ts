import { OfferModelType } from "@/types/models/offers.type";
import api from "../httpServices";

export const createNewOffCode = async ({ data }: { data: OfferModelType }) => {
  return api.post("/offers", data).then((response) => response.data);
};

export const getAllOffers = async () => {
  return api.get("/offers").then((response) => response.data);
};
