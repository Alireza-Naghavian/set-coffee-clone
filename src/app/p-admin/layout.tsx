import AdminPanelLayout from "@/components/layout-components/AdminPanel/AdminPanelLayout";
import dbConnection from "@/dbConfigs/db";
import { ChildrenProps } from "@/types/global.type";
import { getUser } from "@/utils/auth/authHelper";
import { notFound } from "next/navigation";
import { QueryClientProviderWrapper } from "../context/QueryClientProvider";
import dataParser from "@/utils/dataParser/dataParser";
// export const dynamic = "force-dynamic";
async function layout({children}:ChildrenProps) {
  await dbConnection();
  const user = await getUser();
  if (user.role !== "ADMIN") return notFound();
  return (
    <QueryClientProviderWrapper>
        <AdminPanelLayout user={dataParser(user)} >
        {children}
        </AdminPanelLayout>
    </QueryClientProviderWrapper>
  );
}

export default layout;
