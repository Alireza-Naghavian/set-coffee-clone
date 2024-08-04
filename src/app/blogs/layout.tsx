import HeaderPageLayout from '@/components/Shared-components/HeaderPageLayout/HeaderPageLayout'
import { ChildrenProps } from '@/types/global.type'
import React from 'react'

function layout({children}:ChildrenProps) {
  return (
    <div>
        <HeaderPageLayout linkTarget='/blogs' linkTitle='وبلاگ' mainTitle='وبلاگ'/>
        {children}
    </div>
  )
}

export default layout