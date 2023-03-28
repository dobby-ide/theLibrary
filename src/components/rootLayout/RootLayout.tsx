import { Outlet, useNavigation } from 'react-router-dom'
import Footer from '../../pages/footer/Footer'
import MainNavigation from '../../pages/mainNavigation/MainNavigation'
function RootLayout() {
  const navigation = useNavigation()
  return (
    <div>
      <MainNavigation />

      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  )
}
export default RootLayout
