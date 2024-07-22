import UserPanelLayout from "@/components/layout-components/UserPanelPage/UserPanelLayout";
import { getUser } from "@/utils/auth/authHelper";
import dataParser from "@/utils/dataParser/dataParser";

async function UserAccount() {
  const user = await getUser();
  return <main className="max-w-[1920px] relative">
    <UserPanelLayout user={user&& dataParser(user)}/>
  </main>;
}

export default UserAccount;
