import mongoose from "mongoose";
import { ProductCartType } from "../products.type";

export type CartType = {
  user: {
    type: mongoose.Types.ObjectId;
    ref: "user";
  };
  cart: ProductCartType[],
    
  totalItem: number;
  totalDiscount?: number;
  totalPrice: number;
  postCode: number;
  _id?:string,
  createdAt?:Date
};
