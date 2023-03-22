import { Outlet } from 'react-router-dom'
import MainNavigation from '../../pages/mainNavigation/MainNavigation'
function RootLayout() {
  return (
    <div>
      <MainNavigation />
      <Outlet />
    </div>
  )
}
export default RootLayout
