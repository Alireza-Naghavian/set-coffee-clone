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
    expTime: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "USER",
    },
    retryTimes: {
      type: Number,
      default: 3,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    postCode: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
schema.virtual("userCart", {
  ref: "cart",
  foreignField: "user",
  localField: "_id",
});

const UserModel = mongoose.models.user || mongoose.model("user", schema);

export default UserModel;
