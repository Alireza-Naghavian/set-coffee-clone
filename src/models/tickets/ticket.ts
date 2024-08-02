import { TicketType } from "@/types/models/ticket.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<TicketType>(
  {
    body: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },
    dept: {
      type: mongoose.Types.ObjectId,
      ref: "department",
      required: true,
    },
    title: { type: String, required: true },
    user:{
      type:mongoose.Types.ObjectId,
      ref:"user",
      required:true
    }
  },

  {
    timestamps: true,
  }
);

const TicketModel = mongoose.models.ticket || mongoose.model("ticket", schema);
export default TicketModel;
