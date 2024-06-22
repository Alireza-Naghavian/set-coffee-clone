import { signInUserWithOtp } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSignInWithOtp =()=>{
    const { isPending, mutateAsync: signInWithOtp } = useMutation({
        mutationFn: signInUserWithOtp,
        onSuccess: (data: any) => {
          toast.success(data?.message);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.error?.message);
        },
      });
      return { isPending, signInWithOtp };
}

export default useSignInWithOtp