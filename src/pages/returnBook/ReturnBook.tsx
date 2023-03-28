import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import ReturnBookModal from '../searchBook/utilComponents/ReturnBookModal'
import classes from './styling/ReturnBook.module.scss'

const ReturnBook = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isbn, setIsbn] = useState()
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const fullUser = useSelector((state: RootState) =>
    state.user.Users.filter((user) => String(user.email) === currentUser)
  )
  const books = useSelector((state: RootState) => state.book.Books)

  const onReturnBookHandler = (e) => {
    setIsbn(e.target.parentElement.id)
    console.log(e.target.parentElement.id)
    setModalOpen(true)
  }

  const exitModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={classes.returnBookContainer}>
      <div className={classes.bookToReturnContainer}>
        {fullUser[0].booksBorrowed ? (
          fullUser[0].booksBorrowed.map((book) => (
            <div className={classes.bookToReturn} id={book.ISBN} key={book.ISBN}>
              <div className={classes.bookToReturnIsbn}>{book.ISBN}</div>
              <div className={classes.bookToReturnTitle}>{book.title}</div>
              <button className={classes.bookToReturnButton} onClick={onReturnBookHandler}>
                return book
              </button>
              <div className={classes.bookToReturnDueday}>{book.returnDate}</div>
            </div>
          ))
        ) : (
          <p>no books to return</p>
        )}
      </div>
      {modalOpen && <ReturnBookModal exitModal={exitModal} userId={currentUser} isbn={isbn} />}
    </div>
  )
}
export default ReturnBook
