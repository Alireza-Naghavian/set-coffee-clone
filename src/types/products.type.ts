
export type ProductCartType = {
  cover: string;
  title: string;
  price: number;
  count: number;
  _id?: string;
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