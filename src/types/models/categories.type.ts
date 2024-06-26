
import mongoose from "mongoose";

export type SingleProductType = {
  title: string;
  price: number;
  shortDesc: string;
  longDesc: string;
  weight: number;
  suitableFor: string;
  smell: string;
  cover: string;
  tags: string[];
  score?: number;
  category: typeof mongoose.Types.ObjectId;
};

export type categoriesType = {
  title: string;
  products:SingleProductType[]
};
