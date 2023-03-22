import { useState } from 'react'
import EntryForm from '../../components/entryForm/EntryForm'
import { Link } from 'react-router-dom'
const MainNavigation = () => {
  const [login, setLogin] = useState(false)
  return (
    <header className="px-4 py-2 bg-blue-100">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li>
            <Link to="/adminlogin">admin login</Link>
          </li>
          <li>
            <Link to="/userlogin">user login</Link>
          </li>
          <li>
            <Link to="/browsebook">browse books</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default MainNavigation
