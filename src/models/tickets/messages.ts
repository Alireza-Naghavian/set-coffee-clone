import { MessagesType } from "@/types/models/ticket.type";
import mongoose, { Schema } from "mongoose";

export const messageSchema = new Schema<MessagesType>({
  body: {
    type: String,
    required: true,
  },
  sendAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
},{
    _id:false
});
