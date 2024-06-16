import React from "react";
import NavBarContent from "./NavBarContent";
import "./Navbar.module.css"
function NavBarLayout() {
  return (
    <div className=" lg:!container lg:rounded-lg 
     relative lg:mt-[30px] max-w-[1366px] 
      mx-auto  flex-center h-[110px]  ">
      <nav
        className="w-full 
          lg:absolute z-30 lg:px-8 "
      >
        <NavBarContent />
      </nav>
    </div>
  );
}

export default NavBarLayout;
