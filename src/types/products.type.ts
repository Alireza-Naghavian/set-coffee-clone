import React from "react";

export type ProductCartType = {
  cover: string;
  title: string;
  price: number;
  count: number;
  _id?: string;
  entities?:number 
};

export type MainProductCardType ={
  cover : string;
  title:string;
  rate?:HTMLElement;
  price:number
}
export type ProductCardData ={
  productData : MainProductCardType
}
export type ProductFiledValues  = {
  category: string;
  cover: FileList;
  longDesc: string| React.JSX.Element;
  title: string;
  price: string;
  shortDesc: string;
  smell: string;
  tags: string;
  weight: string;
  suitableFor: string;
  entities: number;
}