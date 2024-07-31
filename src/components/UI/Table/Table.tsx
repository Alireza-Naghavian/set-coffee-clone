import { TableStyleType } from "@/types/Table.type";
import { cva } from "class-variance-authority";

const tableStyle = cva("", {
  variants: {
    variant: {
      singleHead: "w-full relative mt-10 table",
      multipleHead: " flex justify-center ",
    },
  },
  defaultVariants: {
    variant: "multipleHead",
  },
});
const tableHeaderStyle = cva("", {
  variants: {
    variant: {
      singleHead: ``,
      multipleHead: `flex justify-between  mt-9 rounded-r-lg 
      lg:rounded-lg items-center lg:w-full w-fit flex-col 
      lg:flex-row my-auto h-full`,
      headerTRow: `rounded-lg`,
    },
  },
});
const tableBodyStyle = cva("", {
  variants: {
    variant: {
      singleHead: `child:grid child:mx-auto child:text-center text-center  `,
      multipleHead: `flex w-[60%] 
       lg:w-auto child:rounded-l-lg lg:child:rounded-lg`,
    },
  },
  defaultVariants: {
    variant: "multipleHead",
  },
});
const tableRowStyle = cva("", {
  variants: {
    variant: {
      singleHead: `my-1 child:my-auto child:mx-auto  border-b py-1 rounded-lg `,
      multipleHead: `lg:grid flex flex-col 
      w-full child:my-auto child:text-center child:mx-auto   
      mt-[35px] lg:mt-6 child:text-gray-700 lg:rounded-lg child:text-base child:font-Shabnam_M 
      child:text-wrap child:max-w-[80%]
    bg-gray-300  
      child:py-2`,
    },
  },
});
function Table({ children, className = "", variant }: TableStyleType) {
  return (
    <table className={tableStyle({ className, variant })}>{children}</table>
  );
}
const TableHead = ({ children, className, variant }: TableStyleType) => {
  return (
    <thead className={tableHeaderStyle({ className, variant })}>
      {children}
    </thead>
  );
};
const TableBody = ({ children, className, variant }: TableStyleType) => {
  return (
    <tbody className={tableBodyStyle({ className, variant })}>{children}</tbody>
  );
};
const TableRow = ({ children, className, variant }: TableStyleType) => {
  return <tr className={tableRowStyle({ className, variant })}>{children}</tr>;
};
Table.Header = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;
