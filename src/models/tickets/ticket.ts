import { TicketType } from "@/types/models/ticket.type";
import mongoose, { Schema } from "mongoose";
import { messageSchema } from "./messages";

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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
    isAnswered: {
      type: Boolean,
      required: false,
      default: false,
    },
    isPending: {
      type: Boolean,
      required: false,
      default: false,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

const TicketModel = mongoose.models.ticket || mongoose.model("ticket", schema);
export default TicketModel;
