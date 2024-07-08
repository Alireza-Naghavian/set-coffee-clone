import { notFound } from "next/navigation";
import api from "../httpServices";
import { SubmitCommentType } from "@/components/Shared-components/Forms/CommentForm";

export const getSingleProductData = async (productId: string) => {
  return api
    .get(`/categories/product/${productId}`)
    .then((response) => response?.data?.data)
    .catch((err) => {
      if (err.response.status === 500) notFound();
    });
};
export const getInitialCategoryData = async () => {
  return api
    .get("/categories/product")
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
