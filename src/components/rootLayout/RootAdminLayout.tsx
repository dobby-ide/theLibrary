import { Outlet } from 'react-router-dom'
import AdminNavigation from '../../pages/mainNavigation/AdminNavigation'
import MainNavigation from '../../pages/mainNavigation/MainNavigation'
function RootAdminLayout() {
  return (
    <div>
      <AdminNavigation />
      <Outlet />
    </div>
  )
}
export default RootAdminLayout
