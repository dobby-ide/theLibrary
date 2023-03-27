import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import UserPage from '../user/UserPage'
import classes from './Homepage.module.scss'

const HomePage = () => {
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const adminLoggedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  console.log(loggedIn)
  console.log(adminLoggedIn)
  return (
    <section className={classes.homepage_container}>
      <div className={classes.homepage_right}>
        <h2>Library management system</h2>
        <p>Browse through your favourite books</p>
      </div>
      {loggedIn && <UserPage></UserPage>}
    </section>
  )
}
export default HomePage
