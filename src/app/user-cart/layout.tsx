import HeaderPageLayout from '@/components/Shared-components/HeaderPageLayout/HeaderPageLayout'
import { ChildrenProps } from '@/types/global.type'

function layout({children}:ChildrenProps) {
  return (
    <div>
        <HeaderPageLayout linkTarget='/user-cart' linkTitle='سبد خرید' mainTitle='سبد خرید'/>
        {children}
    </div>
  )
}

export default layout