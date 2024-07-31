import Cart from '@/components/layout-components/Cart/Cart'
import React from 'react'
import { QueryClientProviderWrapper } from '../context/QueryClientProvider'

function page() {
  return (
    <QueryClientProviderWrapper>

    <Cart/>
    </QueryClientProviderWrapper>
  )
}

export default page