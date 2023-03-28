import { Outlet } from 'react-router-dom'
import Footer from '../../pages/footer/Footer'
import AdminNavigation from '../../pages/mainNavigation/AdminNavigation'
import MainNavigation from '../../pages/mainNavigation/MainNavigation'
function RootAdminLayout() {
  return (
    <div>
      <AdminNavigation />
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  )
}
export default RootAdminLayout
