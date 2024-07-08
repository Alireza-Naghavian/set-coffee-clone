import api from "../httpServices";

export const getAllCategories = async () => {
  return api.get("/categories").then(({ data }: any) => data?.data);
};

export const getSingleCategoryData =async  (categoryId: string) => {
  return api
    .get(`/categories/${categoryId}`)
    .then(({ data }: any) => data?.data);
};
