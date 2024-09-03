import { getAllCategories } from "@/services/product/productServices";
import { useQuery } from "@tanstack/react-query";

const useGetAllCat = () => {
  const { data: categories, isPending: isCatLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  return { categories, isCatLoading };
};
export default useGetAllCat;
