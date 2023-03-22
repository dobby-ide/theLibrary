import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavigation from '../../pages/mainNavigation/UserNavigation'

function RootUserLayout() {
  return (
    <div>
      <UserNavigation />
      <Outlet />
    </div>
  )
}
export default RootUserLayout
