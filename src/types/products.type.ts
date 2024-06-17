export type MiniCardType = {
  title: string;
  cover: string;
  rate: number;
  price: number;
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