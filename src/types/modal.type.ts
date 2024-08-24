import React, { ChangeEventHandler, FormEvent } from "react";

export type ModalType = {
  isShow: boolean;
  onClose: () => void;
  effect: "bottom_to_top" | "ease_out" | "buttom_to_fit";
  children: React.ReactNode;
  className?: string;
};
export type ContentProps = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};
export type HeaderPropsType = Pick<
  ContentProps,
  "children" | "className" | "onClose"
>;

export type DeleteModalType = {
  isDeleteOpen: boolean;
  setIsDeleteOpen: () => void;
  removeHandler: (identifierId: string) => void;
  subjectTitle: string;
  identifier: string;
  isLoading: boolean;
};
export type SelectModalType =Pick<DeleteModalType,"isLoading"|"subjectTitle">& {
  isOpen: boolean;
  setIsOpen: () => void;
  selectHanlder: (e: FormEvent<HTMLFormElement>) => void;
  modalTitle: string;
  value: string | number | boolean;
  onSelectChange: ChangeEventHandler<any>;
  options: { label: string; value: string | boolean | number }[];
};
export type EditModalType = Pick<
  SelectModalType,
  "modalTitle" | "isOpen" | "setIsOpen"
> & {
  children: React.ReactNode;
  className?: string;
};
