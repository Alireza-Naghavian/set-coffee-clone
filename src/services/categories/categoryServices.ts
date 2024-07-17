import api from "../httpServices";



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
