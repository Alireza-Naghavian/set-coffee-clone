"use client";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MobileTabBar from "./MobileTabBar";
import { QueryClientProviderWrapper } from "@/app/context/QueryClientProvider";
import { ToastProvider } from "@/app/context/ToastContainerProvider";

function NavBarContent() {
  const chageNavBar = useMediaQuery("(max-width:1024px)");
  return (
    <>
      {chageNavBar ? (
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
