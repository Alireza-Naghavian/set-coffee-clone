import useGetMe from "@/hooks/authHooks/useGetMe";
import useMediaQuery from "@/hooks/helper-hooks/useMediaQuery";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

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

          <DesktopMenu user={userData}  userLoading={isUserloading} />

      )}
    </>
  );
}

export default NavBarContent;
