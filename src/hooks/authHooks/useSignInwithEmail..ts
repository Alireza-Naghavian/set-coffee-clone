import { signInUserWithEmail } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
const useSignInwithEmail = () => {
  const { isPending, mutateAsync: signIn } = useMutation({
    mutationFn: signInUserWithEmail,
 
    onError: (err: any) => {
      toast.error(err?.response?.data?.error?.message);
    },
  });
  return { isPending, signIn };
};
export default useSignInwithEmail;
