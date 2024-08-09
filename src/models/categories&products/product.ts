import { SingleProductType } from "@/types/models/categories.type";
import mongoose, { Schema } from "mongoose";

export const schema = new Schema<SingleProductType>(
  {
    title: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    suitableFor: {
      type: String,
      required: true,
    },
    smell: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
      
    },
    entities:{
      type:Number,
      required:false,
      default:1
    },
    sold:{
      type:Number,
      required:false,
      default:0
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);
schema.virtual("ProductComment", {
  ref: "comment",
  foreignField: "productId",
  localField: "_id",
});

const ProductModel =
  mongoose.models.product || mongoose.model("product", schema);

export default ProductModel;
