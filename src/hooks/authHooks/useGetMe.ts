import { getUserData } from "@/services/users/userServices";
import { GetMetype } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const { data,isPending:isUserloading } = useQuery({
    queryKey: ["getMe"],
    queryFn: getUserData,
    staleTime: 60 * 60  *24* 1000,
  });
  const user = data;
  return { user,isUserloading };
};
export default useGetMe;
