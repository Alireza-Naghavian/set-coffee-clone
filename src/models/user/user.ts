import { UserType } from "@/types/models/user.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<UserType>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      
    },
    role: {
      type: String,
      required:false,
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", schema);

export default UserModel;
