import { checkOtpCode } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCheckOtpCode = () => {
  const { isPending, mutateAsync: checkOtp } = useMutation({
    mutationFn: checkOtpCode,
    onSuccess: (data: any) => {
      toast.success(data?.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error?.message);
    },
  });
  return { isPending, checkOtp };
};
export default useCheckOtpCode;
