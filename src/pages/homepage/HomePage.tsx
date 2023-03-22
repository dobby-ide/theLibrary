import EntryForm from '../../components/entryForm/EntryForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import UserPage from '../user/UserPage'
import MainNavigation from '../mainNavigation/MainNavigation'
import { Root } from 'react-dom/client'
import AdminEntryForm from '../admin/AdminEntryForm'

const HomePage = () => {
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const adminLoggedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  console.log(loggedIn)
  console.log(adminLoggedIn)
  return (
    <div>
      <h1>I am homepage</h1>
      {/* <AdminEntryForm /> */}
      {loggedIn && <UserPage></UserPage>}
    </div>
  )
}
export default HomePage
