import { OfferModelType } from "@/types/models/offers.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<OfferModelType>(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUsage: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      required: false,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

const OfferModel = mongoose.models.offer || mongoose.model("offer", schema);

export default OfferModel;
