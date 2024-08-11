"use client";
import Table from "@/components/UI/Table/Table";
import useUsers from "@/hooks/authHooks/useUsers";
import { GetMetype } from "@/types/auth.type";
import React from "react";
import LargeUserTRow from "./LargeUserTRow";

function UserTable() {
    const {isUserLoading,users} = useUsers();
    console.log(users);
  return (
    <Table variant="singleHead">
      <Table.Header variant="singleHead" className="hidden md:block">
        <tr
          className="grid grid-cols-8 rounded-lg child:ml-4 child:text-center p-4
                    bg-main_brown text-white"
        >
          <th>شماره</th>
          <th>نام</th>
          <th>ایمیل</th>
          <th>تراکنش ها</th>
          <th>نقش</th>
          <th>تغییر سطح</th>
          <th>حذف</th>
          <th>بن</th>
        </tr>
      </Table.Header>
      <Table.Body
        variant="singleHead"
        className="child:md:grid-cols-8 grid-cols-2"
      >
        {users?.users?.map((user:GetMetype,index:number)=>{
            return (
                <React.Fragment key={user._id}>
                        <LargeUserTRow user={user} index={index}/>

                </React.Fragment>
            )
        })}
      </Table.Body>
    </Table>
  );
}

export default UserTable;
