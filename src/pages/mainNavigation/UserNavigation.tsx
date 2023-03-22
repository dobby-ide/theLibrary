import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLoginActions } from '../../store'
import { Link } from 'react-router-dom'

const UserNavigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const backToMainPage = () => {
    dispatch(userLoginActions.loginAccepted())
    navigate('/')
  }
  return (
    <header className="px-4 py-2 bg-blue-100">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li>
            <button onClick={backToMainPage}>LogOut</button>
          </li>
          <li>
            <Link to="/user/return">return</Link>
          </li>
          <li>
            <Link to="/user/search">search</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default UserNavigation
