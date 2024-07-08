import Link from "next/link";
import React from "react";
type BreadcrumbProps = {
  firstTarget: string;
  firstTitle: React.ReactNode;
  seperator?: React.ReactNode;
  nestedStep: number;
  nestedLinks: { target: string; title: React.ReactNode }[];
};
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  firstTarget,
  firstTitle,
  seperator = "/",
  nestedStep,
  nestedLinks,
}) => {
  return (
    <div
      className="flex justify-start items-center  gap-x-2 gap-y-2 max-w-[640px]
     max-h-6 child:font-Shabnam_M ml-auto flex-wrap ">
      <Link href={firstTarget}>
        <span>{firstTitle}</span>
      </Link>

      {Array.from({ length: nestedStep }).map((_, index) => (
        <React.Fragment key={index}>
          {nestedLinks[index] && (
            <>
              <span>{seperator}</span>
              <Link href={nestedLinks[index].target}>
                <span>{nestedLinks[index].title}</span>
              </Link>
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
