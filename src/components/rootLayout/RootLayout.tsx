import { Outlet } from 'react-router-dom'

import Footer from '../../pages/footer/Footer'
import MainNavigation from '../navigation/MainNavigation'

function RootLayout() {
  return (
    <div>
      <MainNavigation />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default RootLayout
