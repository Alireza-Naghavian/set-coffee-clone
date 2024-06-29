"use client";
import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import { ToastProvider } from "@/app/context/ToastContainerProvider";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

function NavBarContent() {
  const changeNavBar = useMediaQuery("(min-width:1024px)");
  return (
    <>
      {!changeNavBar ? (
        <>
          <MobileMenu />
        </>
      ) : (
        <QueryClientProviderWrapper>
          <ToastProvider>
            <DesktopMenu />
          </ToastProvider>
        </QueryClientProviderWrapper>
      )}
    </>
  );
}

export default NavBarContent;
