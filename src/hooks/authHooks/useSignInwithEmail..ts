import { useAlert } from "@/app/context/AlertContext";
import { signInUserWithEmail } from "@/services/users/userServices";
import { useMutation } from "@tanstack/react-query";
const useSignInwithEmail = () => {
  const { showAlert } = useAlert();
  const { isPending, mutateAsync: signIn } = useMutation({
    mutationFn: signInUserWithEmail,

    onError: (err: any) => {
      showAlert("error", err?.response?.data?.message);
    },
  });
  return { isPending, signIn };
};
export default useSignInwithEmail;
