import api from "../httpServices";

export const getSingleProductData = async (productId: string) => {
  return api.get(`/categories/product/${productId}`).then((data) => data?.data?.data);
};
