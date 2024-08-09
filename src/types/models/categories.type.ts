
import mongoose from "mongoose";
import React from "react";

export type SingleProductType = {
  title: string;
  price: number;
  shortDesc: string;
  longDesc: string |React.JSX.Element;
  weight: number;
  suitableFor: string;
  smell: string;
  cover: string;
  tags: string[];
  score?: number;
  entities?:number;
  category: typeof mongoose.Types.ObjectId |string;
  _id?:string
};

export type categoriesType = {
  title: string;
  products:SingleProductType[]
};
