import { getAllUsers } from "@/services/users/userServices";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { data: users, isPending: isUserLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  return { users, isUserLoading };
};
export default useUsers;
