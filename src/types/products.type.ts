import React from "react";
import { categoriesType, SingleProductType } from "./models/categories.type";
import { SetState } from "./global.type";

export type ShopPageType = {
  allCategories: categoriesType[];
  totalProduct: number;
};
export type ProductCartType = Pick<
  SingleProductType,
  "cover" | "title" | "price"
> & {
  count: number;
  _id?: string;
  entities?: number;
};

export type MainProductCardType = Pick<
  ProductCartType,
  "cover" | "title" | "price"
> & {
  rate?: HTMLElement;
};
export type ProductCardData = {
  productData: MainProductCardType;
};
export type ProductFiledValues = Omit<
  SingleProductType,
"category"|"cover"
> & {
  category: string;
  cover: FileList;
};
export type UpdateProductField = Omit<
  ProductFiledValues,
  "category" | "cover" | "longDesc" | "tags"
>

export type FilterProductType = {
  isFilterOpen: boolean;
  setIsFilterOpen: SetState<boolean>;
  filtersEntity: any;
  setMinPrice: SetState<number>;
  setMaxPrice: SetState<number>;
  setSort: SetState<string>;
  sort: string;
  isProductsLoading: boolean;
  products: { products: SingleProductType[] };
};
