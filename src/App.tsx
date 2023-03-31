// @ts-nocheck
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MantineProvider, Text } from '@mantine/core'
import './App.css'

import { RootState, userActions } from './store'
import User from './model/user'
import HomePage from './pages/homepage/HomePage'
import EntryForm from './components/entryForm/EntryForm'
import AdminEntryForm from './pages/admin/AdminEntryForm'
import RootAdminLayout from './components/rootLayout/RootAdminLayout'
import AdminAuthors from './pages/admin/AdminAuthors'
import AdminBooks from './pages/admin/AdminBooks'
import Protected from './components/routes/ProtectedRoutes'
import RootUserLayout from './components/rootLayout/RootUserLayout'
import ReturnBook from './pages/returnBook/ReturnBook'
import SearchBook from './pages/searchBook/SearchBook'
import ProtectedU from './components/routes/ProtectUserRoute'
import ErrorPage from './pages/mainNavigation/ErrorPage'
import SearchBookDetail from './pages/searchBook/SearchBookDetail'
import UserPage from './pages/user/UserPage'
import RootLayout from './components/rootLayout/RootLayout'
import Footer from './pages/footer/Footer'
import ProjectResource from './pages/footer/projectResources/ProjectResources'
import { Root } from 'react-dom/client'
import AuthenticationTitle from './components/entryForm/EntryFormMantine'

function App() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.Books)
  const isAdminSignedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  const isUserSignedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const user = useSelector((state: RootState) => state.user)

  const addOneUser = () => {
    dispatch(userActions.addUser(new User('fabio', 'fabio', 'fabio')))
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'userlogin', element: <AuthenticationTitle /> },
        { path: 'adminlogin', element: <AdminEntryForm /> },
        {
          path: 'browsebook',
          element: <SearchBook />
        },
        { path: 'browsebook/:bookID', element: <SearchBookDetail book={books} /> }
      ]
    },
    {
      path: '/user',
      element: (
        <Protected isSignedIn={isUserSignedIn}>
          <RootUserLayout />
        </Protected>
      ),
      children: [
        {
          path: '/user',
          element: (
            <Protected isSignedIn={isUserSignedIn}>
              <UserPage />
            </Protected>
          )
        },
        {
          path: 'return',
          element: (
            <Protected isSignedIn={isUserSignedIn}>
              <ReturnBook />
            </Protected>
          )
        },
        {
          path: 'search',
          element: (
            <Protected isSignedIn={isUserSignedIn}>
              <SearchBook />
            </Protected>
          )
        },
        {
          path: 'search/:bookID',
          element: (
            <Protected isSignedIn={isUserSignedIn}>
              <SearchBookDetail book={books} />
            </Protected>
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
              <AdminBooks />
            </Protected>
          )
        }
      ]
    },
    {
      path: '/projectResources',
      element: <ProjectResource />
    }
  ])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </MantineProvider>
  )
}
// export const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authdomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
//   measurementId: import.meta.env.VITE_measurementId
// }
export default App

