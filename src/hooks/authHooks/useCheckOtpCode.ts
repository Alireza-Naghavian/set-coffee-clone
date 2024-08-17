import { useAlert } from "@/app/context/AlertContext";
import { checkOtpCode } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";

const useCheckOtpCode = () => {
  const { showAlert } = useAlert();
  const { isPending, mutateAsync: checkOtp } = useMutation({
    mutationFn: checkOtpCode,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { isPending, checkOtp };
};
export default useCheckOtpCode;
