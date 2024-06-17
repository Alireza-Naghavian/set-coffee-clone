import React from "react";
import NavBarContent from "./NavBarContent";
import "./Navbar.module.css";
function NavBarLayout() {
  return (
    <div
      className=" lg:!container lg:rounded-lg 
     relative lg:mt-[30px] max-w-[1366px] 
      mx-auto  flex-center lg:h-[110px] h-[70px] lg:!inset-0 lg:absolute z-30 bg-white ">
      <nav className="w-full lg:px-8 relative ">
        <NavBarContent />
      </nav>
    </div>
  );
}

export default NavBarLayout;
