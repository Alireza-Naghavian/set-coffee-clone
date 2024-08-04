import { getAllDept } from "@/services/tickets&departments/departmentServices";
import { useQuery } from "@tanstack/react-query";

const useGetAllDept = () => {
  const { data:allDepts, isPending: isDeptLoading } = useQuery({
    queryKey: ["depts"],
    queryFn: getAllDept,
  });

  return { allDepts, isDeptLoading };
};
export default useGetAllDept;
