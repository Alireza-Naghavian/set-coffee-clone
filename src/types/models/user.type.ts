export type UserType = {
  userName: string;
  email?: string;
  phoneNumber: string;
  password: string;
  role?: string;
};
export type SendOtp ={
  phoneNumber: string;
  code:string;
  expTime:number;
  retryTimes:number;
}
