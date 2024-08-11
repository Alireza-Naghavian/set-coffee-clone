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
> & { isActive?: boolean; role?: string,_id:string,password?:string,userCart?:any };
