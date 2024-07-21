import { ToastProvider } from "@/app/context/ToastContainerProvider";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import { GetMetype } from "@/types/auth.type";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import useGetMe from "@/hooks/authHooks/useGetMe";

function NavBarContent({ user }: { user: GetMetype }) {
  const changeNavBar = useMediaQuery("(min-width:1024px)");
  const { user: userData } = useGetMe(user);
  return (
    <>
      {!changeNavBar ? (
        <>
          <MobileMenu user={userData} />
        </>
      ) : (
        <ToastProvider>
          <DesktopMenu user={userData} />
        </ToastProvider>
      )}
    </>
  );
}

export default NavBarContent;
