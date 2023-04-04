import { Outlet } from 'react-router-dom'

import classes from './styling/RootAdminLayout.module.scss'
import AdminNavigation from '../navigation/AdminNavigation'
import Footer from '../../pages/footer/Footer'

function RootAdminLayout() {
  return (
    <section className={classes.rootAdminContainer}>
      <AdminNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  )
}
export default RootAdminLayout
