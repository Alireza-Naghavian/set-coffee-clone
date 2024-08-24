"use client";
import Table from "@/components/UI/Table/Table";
import useUsers from "@/hooks/authHooks/useUsers";
import { UserRoleType } from "@/types/auth.type";
import React from "react";
import LargeUserTRow from "./LargeUserTRow";
import Loader from "@/components/UI/loader/Loader";
import SmallUserTRow from "./SmallUserTRow";
import TextLoader from "@/components/UI/loader/TextLoader";

function UserTable() {
  const { isUserLoading, users } = useUsers();
  if (isUserLoading) {
    return <TextLoader loadingCondition={isUserLoading} />;
  }
  return (
    <div className="h-[480px] overflow-y-auto">
      <Table variant="singleHead">
        <Table.Header variant="singleHead" className="hidden md:block">
          <tr
            className="grid grid-cols-7 rounded-lg  child:text-center p-4
                    bg-main_brown text-white"
          >
            <th>شماره</th>
            <th>نام</th>
            <th>ایمیل</th>
            <th>تراکنش ها</th>
            <th>نقش</th>
            <th>تغییر سطح</th>
            <th>حذف</th>
          </tr>
        </Table.Header>
        <Table.Body
          variant="singleHead"
          className="child:md:grid-cols-7 grid-cols-2"
        >
          {users?.users?.map((user: UserRoleType, index: number) => {
            return (
              <React.Fragment key={user._id}>
                <LargeUserTRow user={user} index={index + 1} />
              </React.Fragment>
            );
          })}
          {users?.users?.map((user: UserRoleType, index: number) => {
            return (
              <React.Fragment key={index}>
                <SmallUserTRow index={index} user={user} />
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default UserTable;
