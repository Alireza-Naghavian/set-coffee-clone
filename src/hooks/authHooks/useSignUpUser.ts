import { useAlert } from "@/app/context/AlertContext";
import { signUpUser } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";

const useSignUpUser = () => {
  const { showAlert } = useAlert();
  const { isPending: isSignUpLoading, mutateAsync: signUp } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: any) => {
      showAlert("success", data?.message);
    },
    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { isSignUpLoading, signUp };
};
export default useSignUpUser;
