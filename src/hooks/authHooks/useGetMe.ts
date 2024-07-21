import { getUserData } from "@/services/users/userServices";
import { GetMetype } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";

const useGetMe = (initialData?: GetMetype) => {
  const { data } = useQuery({
    queryKey: ["getMe"],
    queryFn: getUserData,
    staleTime: 60 * 60  *12* 1000,
    initialData
  });
  const user = data;
  return { user };
};
export default useGetMe;
