// @ts-nocheck
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import classes from './styling/UserPage.module.scss'
//TODO: create some history for the user

const UserPage = () => {
  const user = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const fullUser = useSelector((state: RootState) =>
    state.user.Users.filter((currUser) => String(currUser.email) === user)
  )

  return (
    <div className={classes.userPageContainer}>
      <h2>Welcome {user}</h2>
      <div className={classes.booToReturnContainer}>
        {fullUser[0].booksBorrowed.length > 0 && <h2>Current books on loan:</h2>}
        {fullUser[0].booksBorrowed.length > 0 ? (
          fullUser[0].booksBorrowed.map((book) => (
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
