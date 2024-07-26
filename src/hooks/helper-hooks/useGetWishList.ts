import { useQuery } from "@tanstack/react-query";

const useGetWishList = () => {
  const {data:wishList,isLoading} = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => {
      const storedData = localStorage.getItem("setCoffeeWishlist");
        return JSON.parse(storedData || "[]")
    },
  });
  return {wishList,isLoading}
};
export default useGetWishList;
