export type PropsWithCol = {
    children: React.ReactNode;
    cols: string;
  };
  export type TableStyleType = {
    variant:"singleHead"|"multipleHead"
    children:React.ReactNode
    className?:string
  }
