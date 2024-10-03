import mongoose from "mongoose";

const subscribeschema= new mongoose.Schema({
    endpoint: { type: String, required: true },
    expirationTime: { type: Date, default: null },
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
      },
},{timestamps:true})

const subscribeModel = mongoose.models.subscription || mongoose.model("subscription",subscribeschema)
export default subscribeModel