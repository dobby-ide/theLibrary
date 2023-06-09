// @ts-nocheck
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../../store'
import classes from './styling/UserPage.module.scss'
import { fetchUsers } from '../../redux/slices/userSlice'
//TODO: create some history for the user

const UserPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)

  const fullUser = useSelector((state: RootState) =>
    state.user.Users.filter((currUser) => String(currUser.email) === user)
  )
  useEffect(() => {
    dispatch(fetchUsers('users'))
  }, [dispatch])
  return (
    <div className={classes.userPageContainer}>
      <h2>Welcome {userName}</h2>
      <div className={classes.bookToReturnContainer}>
        {fullUser[0].books.length > 0 && <h2>Current books on loan:</h2>}
        {fullUser[0].books.length > 0 ? (
          fullUser[0].books.map((book) => (
            <div className={classes.bookToReturn} key={book.ISBN} id={book.ISBN}>
              <div className={classes.bookToReturnIsbn}>{book.ISBN}</div>
              <div className={classes.bookToReturnTitle}>{book.title}</div>
              <div className={classes.bookToReturnDueday}>{book.returnDate}</div>
            </div>
          ))
        ) : (
          <p>no books to return</p>
        )}
      </div>
    </div>
  )
}
export default UserPage
