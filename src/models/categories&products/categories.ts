import { categoriesType } from "@/types/models/categories.type";
import mongoose, { Schema } from "mongoose";
import { schema as ProductSchema } from "./product";
const schema = new Schema<categoriesType>(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    products: {
      type: [ProductSchema],
      default: [],
    },
  },

);

const CategoryModel =
  mongoose.models.category || mongoose.model("category", schema);
export default CategoryModel;
