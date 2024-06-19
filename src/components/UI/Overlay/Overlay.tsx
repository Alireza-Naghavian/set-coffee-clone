import React from "react";
type OverlayType = {
  onClose: () => void;
  openCondition: boolean;
};
function Overlay({ onClose, openCondition }: OverlayType) {
  return (
    <div
      onClick={() => {
        onClose();
      }}
      className={` fixed w-full h-full  ${
        openCondition ? "opacity-100 visible" : "opacity-0 invisible"
      } inset-0 tr-400 bg-black/50 z-40`}
    ></div>
  );
}

export default Overlay;
