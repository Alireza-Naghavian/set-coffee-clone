import { useAlert } from "@/app/context/AlertContext";
import { pushSubscription } from "@/services/notification&subscription/notifService"
import { useMutation } from "@tanstack/react-query"

const usePushSubscription = ()=>{
    const { showAlert } = useAlert();
const {mutateAsync:pushSub,isPending:isSubLoading} = useMutation({
    mutationFn:pushSubscription,
    onSuccess:(data)=>{
        showAlert("success",data?.message)
    },
    onError: (err: any) => {
        showAlert("error", err?.response?.data?.message);
      },

})
return {pushSub,isSubLoading}
}
export default usePushSubscription