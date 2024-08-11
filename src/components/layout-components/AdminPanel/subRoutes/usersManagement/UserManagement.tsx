import React from 'react'
import HeaderAdminLayout from '../Products/HeaderAdminLayout'
import UserTable from './UserTable'

function UserManagement() {
  return (
<HeaderAdminLayout title='مدیریت کاربران'>
    <UserTable/>
</HeaderAdminLayout>
  )
}

export default UserManagement