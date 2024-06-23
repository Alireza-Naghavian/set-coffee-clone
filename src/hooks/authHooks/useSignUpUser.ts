import { signUpUser } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSignUpUser = () => {
  const {isPending:isSignUpLoading,mutateAsync:signUp} = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: any) => {
      toast.success(data?.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error?.message);
    },
  });
  return {isSignUpLoading,signUp}
};
export default useSignUpUser