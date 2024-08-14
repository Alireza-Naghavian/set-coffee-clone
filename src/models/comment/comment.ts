import { CommentModeltype } from "@/types/models/comment.type";
import mongoose, { Schema } from "mongoose";
import { messageSchema } from "./commentMessages";

const schema = new Schema<CommentModeltype>({
  commentBody: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  isAccept: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  score: {
    type: Number,
    required: true,
  },

  productId: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
  
});
schema.virtual("productData", {
  ref: "product",
  localField: "productId",
  foreignField: "_id",
});
const CommentModel =
  mongoose.models.comment || mongoose.model("comment", schema);
export default CommentModel;
