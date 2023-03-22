/* eslint-disable prettier/prettier */
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import RootLayout from './components/rootLayout/RootLayout'
import UserPage from './pages/user/UserPage'

import './App.css'

import { RootState, userActions } from './store'

import User from './model/user'

import HomePage from './pages/homepage/HomePage'
import EntryForm from './components/entryForm/EntryForm'
import AdminEntryForm from './pages/admin/AdminEntryForm'
import AdminPage from './pages/admin/Adminpage'
import RootAdminLayout from './components/rootLayout/RootAdminLayout'
import AdminAuthors from './pages/admin/AdminAuthors'
import AdminBooks from './pages/admin/AdminBooks'
import Protected from './components/routes/ProtectedRoutes'
import RootUserLayout from './components/rootLayout/RootUserLayout'
import ReturnBook from './pages/returnBook/ReturnBook'
import SearchBook from './pages/searchBook/SearchBook'
import ProtectedU from './components/routes/ProtectUserRoute'

function App() {
  const isAdminSignedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  const isUserSignedIn = true
  console.log(isAdminSignedIn)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/userlogin', element: <EntryForm /> },
        { path: '/adminlogin', element: <AdminEntryForm /> }
      ]
    },
    {
      path: '/user',
      element: (
        <ProtectedU isSignedIn={isUserSignedIn}>
          <RootUserLayout />
        </ProtectedU>
      ),
      children: [
        {
          path: '/user/return',
          element: (
            <ProtectedU isSignedIn={isUserSignedIn}>
              <ReturnBook />
            </ProtectedU>
          )
        },
        {
          path: '/user/search',
          element: (
            <ProtectedU isSignedIn={isUserSignedIn}>
              <SearchBook />
            </ProtectedU>
          )
        }
      ]
    },
    {
      path: '/admin',
      element: (
        <Protected isSignedIn={isAdminSignedIn}>
          <RootAdminLayout />
        </Protected>
      ),
      children: [
        {
          path: '/admin/authors',
          element: (
            <Protected isSignedIn={isAdminSignedIn}>
              <AdminAuthors />
            </Protected>
          )
        },
        {
          path: '/admin/books',
          element: (
            <Protected isSignedIn={isAdminSignedIn}>
              <AdminBooks />{' '}
            </Protected>
          )
        }
      ]
    }
  ])
  //const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const addOneUser = () => {
    dispatch(userActions.addUser(new User('fabio', 'fabio', 'fabio')))
  }
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <div className="card">
        <button onClick={addOneUser}>add user</button>
        <span className="px-10"></span>
      </div>
    </div>
  )
}

export default App
