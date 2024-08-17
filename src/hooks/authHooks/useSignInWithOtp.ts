import { useAlert } from "@/app/context/AlertContext";
import { signInUserWithOtp } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";

const useSignInWithOtp = () => {
  const { showAlert } = useAlert();
  const { isPending, mutateAsync: signInWithOtp } = useMutation({
    mutationFn: signInUserWithOtp,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { isPending, signInWithOtp };
};

export default useSignInWithOtp;
