import api from "../httpServices";

export const getAllCategories = async () => {
  return api.get("/categories").then(({ data }: any) => data?.data);
};

export const getSingleCategoryData = async (
  categoryId: string,
  queryParams: any
) => {
  return api
    .get(
      `/categories/${categoryId}?sort=${queryParams.sort}&&minPrice=${queryParams.minPrice}&&maxPrice=${queryParams.maxPrice}&&rateStar=${queryParams.stars}&&page=${queryParams.page}`
    )
    .then(({ data }: any) => data?.data);
};
