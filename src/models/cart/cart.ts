import { CartType } from "@/types/models/cart.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<CartType>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postCode: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      required: false,
    },
    totalItem: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    cart: {
      type: [
        {
          count: { type: Number },
          cover: { type: String },
          title: { type: String },
          price: { type: Number },
          score: { type: Number },
        },
      ],
      required:true
    },
  },
  { timestamps: true }
);
const CartModel = mongoose.models.cart || mongoose.model("cart", schema);
export default CartModel;
