import { notFound } from "next/navigation";
import api from "../httpServices";
import { SubmitCommentType } from "@/components/Shared-components/Forms/CommentForm";
import { SingleProductType } from "@/types/models/categories.type";
import { FieldValues } from "react-hook-form";

export const getSingleProductData = async (productId: string) => {
  return api
    .get(`/categories/product/${productId}`)
    .then((response) => response?.data?.data)
    .catch((err) => {
      if (err.response.status === 500) notFound();
    });
};
export const getInitialCategoryData = async (queryParams: URLSearchParams) => {
  return api
    .get(`/categories/product?${queryParams.toString()}`)
    .then(({ data }: any) => data?.data);
};
export const addCommentOnProduct = async ({
  data,
}: {
  data: SubmitCommentType;
}) => {
  return api
    .post(`/comments/${data.productId}`, data)
    .then((response) => response?.data);
};

export const getAllCategories = async () => {
  return await api.get("/categories").then(({ data }) => data);
};
export const AddNewProduct = async(data:FieldValues)=>{
return api.post("/categories/product",data).then((response)=>response.data)
}

export const deleteProduct = async (productId:string)=>{
return api.delete(`/categories/product/${productId}`).then((response)=>response.data)
}