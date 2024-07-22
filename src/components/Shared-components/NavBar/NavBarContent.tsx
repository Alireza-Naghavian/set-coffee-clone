import { ToastProvider } from "@/app/context/ToastContainerProvider";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import { GetMetype } from "@/types/auth.type";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import useGetMe from "@/hooks/authHooks/useGetMe";

function NavBarContent() {
  const changeNavBar = useMediaQuery("(min-width:1024px)");
  const { user: userData,isUserloading } = useGetMe();
  return (
    <>
      {!changeNavBar ? (
        <>
          <MobileMenu user={userData}  userLoading={isUserloading}/>
        </>
      ) : (
        <ToastProvider>
          <DesktopMenu user={userData}  userLoading={isUserloading} />
        </ToastProvider>
      )}
    </>
  );
}

export default NavBarContent;
