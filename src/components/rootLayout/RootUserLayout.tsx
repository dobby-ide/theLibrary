import { Outlet } from 'react-router-dom'

import Footer from '../../pages/footer/Footer'
import UserNavigation from '../navigation/UserNavigation'

function RootUserLayout() {
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
