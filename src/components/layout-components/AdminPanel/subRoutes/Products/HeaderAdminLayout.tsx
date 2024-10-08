import React from "react";

function HeaderAdminLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full sm:px-8 px-4 mt-10 h-screen lg:h-full overflow-y-auto  ">
      <div className="">
        <h1 className="w-full text-right text-xl lg:text-3xl font-Shabnam_B text-dark_shade pb-2">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}

export default HeaderAdminLayout;
