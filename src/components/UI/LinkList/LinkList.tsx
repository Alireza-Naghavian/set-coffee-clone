"use client";
import { useAlert } from "@/app/context/AlertContext";
import useGetMe from "@/hooks/authHooks/useGetMe";
import useLogOut from "@/hooks/authHooks/useLogout";
import { UserPanelAside } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";

function LinkList() {
  const Path = usePathname();
  const { showAlert } = useAlert();
  const { user } = useGetMe();
  const { push } = useRouter();
  const { logout } = useLogOut();
  const logOutHandler = () => {
    logout();
    showAlert("success", "خروج موفقیت آمیز");
  };
  return (
    <>
      {UserPanelAside.map((link: { href: string; label: string }, index) => {
        return (
          <button
            key={index}
            disabled={!user}
            onClick={
              link.href === "/my-account/logout"
                ? logOutHandler
                : () => push(link.href)
            }
            className={` text-right ${
              link.href === Path ? "bg-gray-100  w-full" : ""
            }
          ${
            link.href == "/my-account/wishlist" && link.href === Path
              ? "opacity-100"
              : !user
              ? "opacity-50"
              : "opacity-100"
          }`}
          >
            {link.label}
          </button>
        );
      })}
    </>
  );
}

export default LinkList;
