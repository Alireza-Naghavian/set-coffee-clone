import React from 'react'
import HeaderAdminLayout from '../Products/HeaderAdminLayout'
import AddBLogForm from './AddBLogForm'

function Blogs() {
  return (
<HeaderAdminLayout title='افرودن مقاله جدید'>
    <AddBLogForm/>
</HeaderAdminLayout>
  )
}

export default Blogs