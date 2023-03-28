import { Outlet } from 'react-router-dom'

import Footer from '../../pages/footer/Footer'
import UserNavigation from '../../pages/mainNavigation/UserNavigation'

function RootUserLayout() {
  return (
    <div>
      <UserNavigation />
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  )
}
export default RootUserLayout
