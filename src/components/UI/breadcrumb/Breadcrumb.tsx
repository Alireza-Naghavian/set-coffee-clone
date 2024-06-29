import Link from "next/link";
import React from "react";
interface BreadcrumbType {
  [key: string]: string;
}
function Breadcrumb({
  firstTarget,
  secondTarget,
  firstTitle,
  secondTitle,
  lastTitle,
}: BreadcrumbType) {
  return (
    <div
      className="flex justify-start items-center  gap-x-2 gap-y-2 max-w-[640px]
     max-h-6 child:font-Shabnam_M ml-auto flex-wrap ">
      <Link href={firstTarget}>
        <span>{firstTitle}</span>
      </Link>
      /
      <Link href={secondTarget}>
        <span>{secondTitle}</span>
      </Link>
      /<span>{lastTitle}</span>
    </div>
  );
}

export default Breadcrumb;
