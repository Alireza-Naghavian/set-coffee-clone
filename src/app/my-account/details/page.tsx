import AccountDetail from "@/components/layout-components/UserPanelPage/subRoutes/AccountDetail";
import { getUser } from "@/utils/auth/authHelper";
import dataParser from "@/utils/dataParser/dataParser";
import { redirect } from "next/navigation";

async function page() {
  const user = await getUser();
  if (!user) return redirect("/register-login");
  return (
    <main className="relative max-w-[1920px]">
      <AccountDetail user={dataParser(user)} />
    </main>
  );
}

export default page;
