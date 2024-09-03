import UserPanelHomePage from "@/components/layout-components/UserPanelPage/subRoutes/UserPanelHomePage";
import { getUser } from "@/utils/auth/authHelper";
import dataParser from "@/utils/dataParser/dataParser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee-پنل کاربری",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
  icons: "/images/favicon.png",
};
export const dynamic = "force-dynamic";
async function UserAccount() {
  const user = await getUser();
  if (!user) return redirect("/register-login");
  return (
    <main className="max-w-[1920px] relative">
      
          <UserPanelHomePage user={dataParser(user)} />
    </main>
  );
}

export default UserAccount;
