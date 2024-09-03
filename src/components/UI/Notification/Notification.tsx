import React from "react";

function Notification({className}:{className?:string}) {
  return (
    <span className={`relative flex h-3 w-3 ${className}`}>
      <span className="absolute inline-flex rounded-full h-2 w-2 bg-white"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 animate-ping bg-white"></span>
    </span>
  );
}

export default Notification;
