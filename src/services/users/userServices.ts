import api from "../httpServices";
import { LoginFormType } from "@/types/auth.type";
export const signInUserWithEmail = async (data: LoginFormType) => {
  return api.post("/auth/signin", data).then((data) => data?.data);
};
export const signInUserWithOtp = async (data: LoginFormType) => {
  return api.post("/auth/sendotp", data).then((data) => data?.data);
};
export const checkOtpCode = async (data: {code:string,phoneNumber:string}) => {
  return api.post("/auth/checkotp", data).then((data) => data?.data);
};
