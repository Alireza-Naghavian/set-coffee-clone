"use client"

import ClientOnlyPortal from "@/hooks/helper-hooks/ClientProtal";
import { ChildrenProps } from "@/types/global.type";
import { ContentProps, HeaderPropsType, ModalType } from "@/types/modal.type";
import { cva } from "class-variance-authority";
import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const Modal: React.FC<ModalType> = (props) => {
  const { children, effect, isShow, onClose } = props;
  useEffect(() => {
    document.body.style.overflow = isShow ? "hidden" : "unset";
  }, [isShow]);
  // close modal on press scape
  useEffect(() => {
    const closeModalOnScape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (isShow) document.addEventListener("keydown", closeModalOnScape);
      return () => document.removeEventListener("keydown", closeModalOnScape);
    };
  }, [isShow, onClose]);

  //styles
  const modalStyle = cva("bg-white hidden lg:block", {
    variants: {
      effect: {
        bottom_to_top: `${
          isShow ? "bottom-0 lg:top-20" : "-bottom-full lg:top-60"
        }
         w-full h-full lg:h-fit lg:max-w-3xl 
          fixed transition-all duration-700 left-0 right-0 mx-auto
        `,
        ease_out: `${
          isShow ? "top-20 transform scale-100" : `top-40 transform scale-50 `
        } 
         max-w-3xl 
        fixed transition-all duration-500 left-0 right-0 mx-auto
        
        `,
        buttom_to_fit: `${
          isShow ? "bottom-0" : "-bottom-full"
        } w-full h-fit lg:max-w-3xl 
        fixed transition-all duration-700 left-0 right-0 mx-auto `,
      },
    },
    defaultVariants: {
      effect: "ease_out",
    },
  });

  return (
    <ClientOnlyPortal>


    <div
      className={`${
        isShow ? "visible opacity-100" : "invisible opacity-0 "
      } fixed inset-0 !z-[99999] transition-all duration-500`}
    >
      <div
        className="h-screen w-screen bg-gray-400/40 "
        onClick={() => onClose()}
      />

      <div className={modalStyle({ effect })}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? // eslint-disable-next-line no-use-before-define
              React.cloneElement(child as React.ReactElement<ContentProps>, {
                onClose,
              })
            : child
        )}
      </div>
    </div>
    </ClientOnlyPortal>
  );
};

const Content: React.FC<ContentProps> = (props) => {
  const { children, onClose, ...restProps } = props;
  return (
 
    <div {...restProps}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<ContentProps>, {
              onClose,
            })
          : child
      )}
    </div>

  );
};

const Header: React.FC<HeaderPropsType> = (props) => {
  const { children, onClose } = props;
  return (

    <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2">
      <span className="text-sm">{children}</span>
      <button onClick={onClose} className="p-1">
        <IoIosClose size={22} />
      </button>
    </div>

  );
};

const Body: React.FC<ChildrenProps> = ({ children }) => {
  return (<>{children}</>);
};

const CompoundModal = Object.assign(Modal, {
  Modal,
  Content,
  Header,
  Body,
});
export default CompoundModal;
