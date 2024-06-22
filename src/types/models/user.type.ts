export type UserType = {
  userName: string;
  email?: string;
  phoneNumber: string;
  password: string;
  role?: string;
  expTime: number;
  retryTimes: number;
  isActive:boolean
};
export type CheckOtpType = {
  phoneNumber: string;
  code: string;
};
