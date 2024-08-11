import { UpdateProfileType } from "@/app/api/auth/updateProfile/route";
import api from "../httpServices";
import { LoginFormType, SignUpFromType } from "@/types/auth.type";
export const signInUserWithEmail = async (data: LoginFormType) => {
  return api.post("/auth/signin", data).then((data) => data?.data);
};
export const signInUserWithOtp = async (data: LoginFormType) => {
  return api.post("/auth/sendotp", data).then((data) => data?.data);
};
export const checkOtpCode = async (data: {
  code: string;
  phoneNumber: string;
}) => {
  return api.post("/auth/checkotp", data).then((data) => data?.data);
};
export const signUpUser = async (data: SignUpFromType) => {
  return api.post("/auth/signup", data).then((data) => data?.data);
};

export const getUserData = async () => {
  try {
    return await api.get("/auth/getme").then(({ data }) => data?.data);
  } catch (error) {
    return null;
  }
};

export const updateUserProfile = async (data: UpdateProfileType) => {
  return api.post("/auth/updateProfile", data).then(({ data }) => data.message);
};
export const logOutUser = async () => {
  return api.post("/auth/logout").then(({ data }) => data.message);
};
export const UpdateUserPostCode = async (postCode: { postCode: number }) => {
  return api
    .post("/auth/updateProfile/postCode", postCode)
    .then(({ data }) => data.message);
};

export const getAllUsers = async () => {
  return api
    .get("/auth/all-users")
    .then((data) => data?.data)
    .catch((err) => err.response?.data?.message);
};

export const updateUserRole = async({userId,data}:{userId:string,data:{role:string}})=>{
  return api.post(`/auth/all-users/${userId}`,data).then((response)=>response.data)
}