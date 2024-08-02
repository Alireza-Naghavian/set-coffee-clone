import { CartType } from "@/types/models/cart.type";
import api from "../httpServices";

export const addNewOrder = async ({ order }: { order: CartType }) => {
  return await api.post("/cart", order).then((response) => response?.data);
};
export const  getAllUserOrder = async ()=>{
  return await api.get("/cart").then((data)=>data.data)
}
