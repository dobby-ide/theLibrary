import { Outlet, useNavigation } from 'react-router-dom'
import MainNavigation from '../../pages/mainNavigation/MainNavigation'
function RootLayout() {
  const navigation = useNavigation()
  return (
    <div>
      <MainNavigation />

      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default RootLayout
