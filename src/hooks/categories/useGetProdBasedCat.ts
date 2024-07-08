import { getSingleCategoryData } from "@/services/categories/categoryServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProdBasedCat = (categoryId: string) => {
  const { data, isPending: isProductLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getSingleCategoryData(categoryId),
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
  const categoryData = data || {};
  return { categoryData, isProductLoading };
};
export default useGetProdBasedCat;
