import React from "react";

function HeaderProductLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full px-8 mt-10 h-full  ">
      <div className="">
        <h1 className="w-full text-right text-xl lg:text-3xl font-Shabnam_B text-dark_shade pb-2">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}

export default HeaderProductLayout;
