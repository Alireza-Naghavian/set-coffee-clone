export const isProductInWishlist = (productId: string): boolean => {
    const storedData: string | null = localStorage.getItem("setCoffeeWishlist");
    const getData = storedData ? JSON.parse(storedData) : [];
    return getData.some((data: any) => data._id === productId);
  };
  export const addProductToWishlist = (product: any) => {
    const storedData: string | null = localStorage.getItem("setCoffeeWishlist");
    const getData = storedData ? JSON.parse(storedData) : [];
    if (!getData.some((data: any) => data._id === product._id)) {
      getData.push(product);
      localStorage.setItem("setCoffeeWishlist", JSON.stringify(getData));
      return true;
    }
    return false;
  };