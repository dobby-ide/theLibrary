import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


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

function App() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.Books)
  const isAdminSignedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  const isUserSignedIn = true
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
        { path: 'userlogin', element: <EntryForm /> },
        { path: 'adminlogin', element: <AdminEntryForm /> },
        {
          path: 'browsebook',
          element: <SearchBook />
        },
        { path: 'browsebook/:bookID', element: <SearchBookDetail book={books} /> }
      ]
    },
    {
      path: 'user',
      element: (
        <ProtectedU isSignedIn={isUserSignedIn}>
          <RootUserLayout />
        </ProtectedU>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedU isSignedIn={isUserSignedIn}>
              <UserPage />
            </ProtectedU>
          )
        },
        {
          path: 'return',
          element: (
            <ProtectedU isSignedIn={isUserSignedIn}>
              <ReturnBook />
            </ProtectedU>
          )
        },
        {
          path: 'search',
          element: (
            <ProtectedU isSignedIn={isUserSignedIn}>
              <SearchBook />
            </ProtectedU>
          )
        },
        {
          path: 'search/:bookID',
          element: (
            <ProtectedU isSignedIn={isUserSignedIn}>
              <SearchBookDetail book={books} />
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
              <AdminBooks />
            </Protected>
          )
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
