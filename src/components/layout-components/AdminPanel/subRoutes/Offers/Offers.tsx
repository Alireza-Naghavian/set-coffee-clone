import React from 'react'
import HeaderAdminLayout from '../Products/HeaderAdminLayout'
import OfferForm from './OfferForm'

function Offers() {
  return (
<div className='w-full flex flex-col items-center relative'>
    <HeaderAdminLayout title='ایجاد کد تخفیف' >
<OfferForm/>
    </HeaderAdminLayout>
    <HeaderAdminLayout title='کد های تخفیف' >
        <></>
    </HeaderAdminLayout>
</div>
)
}

export default Offers