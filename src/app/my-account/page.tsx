import UserPanelHomePage from "@/components/layout-components/UserPanelPage/subRoutes/UserPanelHomePage";
import { getUser } from "@/utils/auth/authHelper";
import dataParser from "@/utils/dataParser/dataParser";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'
async function UserAccount() {

  const user = await getUser();
  if(!user) return redirect("/register-login")
  return <main className="max-w-[1920px] relative">
    <UserPanelHomePage user={dataParser(user)}/>
  </main>;
}

export default UserAccount;
