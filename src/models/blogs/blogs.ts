import { MainBlogType } from "@/types/blog.type";
import mongoose, { Schema } from "mongoose";

const schema = new Schema<MainBlogType>(
  {
    cover: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    provider: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const BlogsModel = mongoose.models.blog || mongoose.model("blog", schema);
export default BlogsModel;
