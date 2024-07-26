
export const isProductInWishlist = (
  productId: string,
  value: string = "setCoffeeWishlist"
): boolean => {
  const storedData: string | null = localStorage.getItem(value);
  const getData = storedData ? JSON.parse(storedData) : [];
  return getData.some((data: any) => data._id === productId);
};

