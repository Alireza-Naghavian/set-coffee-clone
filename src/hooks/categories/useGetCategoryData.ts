import { getAllCategories } from "@/services/categories/categoryServices";
import { useQuery } from "@tanstack/react-query";

const useGetAllCategories = () => {
  const { data, isPending: isCatLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,

    refetchOnWindowFocus: false,
  });
  const categories = data || [];
  return { categories, isCatLoading };
};

export default useGetAllCategories;