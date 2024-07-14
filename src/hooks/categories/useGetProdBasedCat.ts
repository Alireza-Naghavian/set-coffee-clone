import { getSingleCategoryData } from "@/services/categories/categoryServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProdBasedCat = (
  categoryId: string,
  filtersEntity: any,
  applyPrice: [number, number]
) => {
  const { sort, stars, page } = filtersEntity;
  const { data, isPending: isProductLoading,isError ,status} = useQuery({
    queryKey: ["category", categoryId, sort, stars, page, applyPrice],
    queryFn: () => getSingleCategoryData(categoryId, filtersEntity),
    refetchOnWindowFocus: false,
    staleTime: 0,
    
  });
  const categoryData = data || {};
  return { categoryData, isProductLoading,isError,status };
};
export default useGetProdBasedCat;
