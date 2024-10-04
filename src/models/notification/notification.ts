import { required } from "joi";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  cover:{type:String,required:true},
  vibrate: { type: [Number] },
  actions: { type: Array },
  status: { type: String, default: "draft" }, // حالت: draft یا sent
  createdAt: { type: Date, default: Date.now },
});
const NotifModel =
  mongoose.models.notification ||
  mongoose.model("notification", notificationSchema);
export default NotifModel;
