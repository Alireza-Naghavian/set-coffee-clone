import React from "react";

export type ModalType = {
    isShow:boolean,
    onClose:()=>void,
    effect:'bottom_to_top' | 'ease_out' | 'buttom_to_fit';
    children:React.ReactNode
    className?:string
}
export type ContentProps = {
    onClose: () => void
    children: React.ReactNode
    className?: string
  }
  export type HeaderPropsType ={
    onClose: () => void
    children: React.ReactNode
    className?:string
  }