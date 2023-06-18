import { Outlet, useLocation } from 'react-router-dom'

import Footer from '../../pages/footer/Footer'
import UserNavigation from '../navigation/UserNavigation'

function RootUserLayout() {
  const location = useLocation()
  const { state } = location
  return (
    <div>
      <UserNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default RootUserLayout
