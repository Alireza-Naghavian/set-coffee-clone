import React, { PropsWithChildren } from "react";
type BadgeType = {
  children: React.ReactNode;
  additionalClass?: string;
};
const Badge = ({ children, additionalClass }: BadgeType) => {
  return (
    <span
      className={`child:text-dark_shade 
     child:group-hover:text-white child:tr-200 
      child:border child:border-gray-200
       child:group-hover:border-main_brown
       child:group-hover:bg-main_brown ${additionalClass}`}>
      {children}
    </span>
  );
};

export default Badge;
