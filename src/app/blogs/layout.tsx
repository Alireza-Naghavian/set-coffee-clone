import HeaderPageLayout from '@/components/Shared-components/HeaderPageLayout/HeaderPageLayout'
import { ChildrenProps } from '@/types/global.type'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "فروشگاه قهوه ست| SET Coffee-مقالات",
  description:
    "قهوه ست فروشگاهی است که هر نوع قهوه مورد نیاز برای هر سلیقه ای را موجود دارد",
};
function layout({children}:ChildrenProps) {
  return (
    <div>
        <HeaderPageLayout linkTarget='/blogs' linkTitle='وبلاگ' mainTitle='وبلاگ'/>
        {children}
    </div>
  )
}

export default layout