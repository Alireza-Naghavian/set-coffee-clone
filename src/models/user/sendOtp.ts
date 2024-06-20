import { SendOtp } from "@/types/models/user.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<SendOtp>({
  phoneNumber: {
    type: String,
    required: true,
  },
  expTime: {
    type: Number,
    required: true,
  },
  retryTimes: {
    type: Number,
    default: 3,
  },
});

const sendOtpModel =
  mongoose.models.sendOtp || mongoose.model("sendOtp", schema);
export default sendOtpModel;
