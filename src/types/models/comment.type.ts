import mongoose from "mongoose";

export type CommentModeltype = {
  userName: string;
  commentBody: string;
  score: number;
  isAccept: boolean;
  date: Date;
  productId: typeof mongoose.Types.ObjectId;
  productData?:[{_id:string,title:string}];
  _id?:string
};
