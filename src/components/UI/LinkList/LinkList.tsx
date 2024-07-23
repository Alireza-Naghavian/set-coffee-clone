"use client";
import useGetMe from "@/hooks/authHooks/useGetMe";
import { subUserMenu } from "@/utils/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function LinkList() {
  const Path = usePathname();
  const { user } = useGetMe();
  const { push } = useRouter();
  return (
    <>
      {subUserMenu.map((link: { href: string; label: string }, index) => {
        return (
          <button
            key={index}
            disabled={!user}
            onClick={() => push(link.href)}
            className={` text-right ${link.href === Path ? "bg-gray-100  w-full" : ""}
            ${ link.href =="/my-account/wishlist" && link.href === Path ? "opacity-100": !user ? "opacity-50": "opacity-100"}`}>
            {link.label}
          </button>
        );
      })}
    </>
  );
}

export default LinkList;
