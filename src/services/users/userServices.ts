import api from "../httpServices";
import { LoginFormType } from "@/types/auth.type";
export const signInUserWithEmail = async (data: LoginFormType) => {
  return api.post("/auth/signin", data).then((data) => data?.data)
};
