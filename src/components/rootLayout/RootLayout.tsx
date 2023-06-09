import { Outlet } from 'react-router-dom'
import classes from './styling/RootLayout.module.scss'
import Footer from '../../pages/footer/Footer'
import MainNavigation from '../navigation/MainNavigation'

function RootLayout() {
  return (
    <>
      <section className={classes.rootLayout}>
        <MainNavigation />

        <main>
          <Outlet />
        </main>
      </section>
      <section className={classes.rootFooter}>
        <Footer />
      </section>
    </>
  )
}
export default RootLayout
