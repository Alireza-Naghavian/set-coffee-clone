export type LoginFormType = {
  identifier: string;
  passwrod?: string;
};

export type SignUpFromType = {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
};
export type GetMetype = Pick<
  SignUpFromType,
  "email" | "phoneNumber" | "userName"
> & {
  isActive?: boolean;
  role?: string;
  _id: string;
  password?: string;
  userCart?: any;
  postCode?:number
};

export type GrowthDataType = Pick<
  GetMetype,
  "email" | "userName" | "role" | "userCart"
>[];
export type UserRoleType = Omit<GetMetype, "role"> & { role: string };
