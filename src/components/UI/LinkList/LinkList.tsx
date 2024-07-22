"use client"
import { subUserMenu } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function LinkList() {
    const Path = usePathname();
  return (
<>
{subUserMenu.map((link:{href:string,label:string}, index) => {
              return (
                <Link
                  key={index}
                  className={`${link.href === Path ? "bg-gray-100 " : ""}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
</>
  )
}

export default LinkList