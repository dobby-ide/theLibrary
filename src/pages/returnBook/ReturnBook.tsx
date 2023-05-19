// @ts-nocheck

import { SetStateAction, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import ReturnBookModal from '../../components/modals/book/ReturnBookModal'
import classes from './styling/ReturnBook.module.scss'
import { fetchUsers } from '../../redux/slices/userSlice'
import { currentUserActions } from '../../redux/slices/currentUserSlice'

const ReturnBook = () => {
  let booksOfCurrentUser = useSelector((state: RootState) => state.currentUser.currentUserBooks)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers('users'))
  }, [dispatch])

  const [modalOpen, setModalOpen] = useState(false)
  const [isbn, setIsbn] = useState()
  const currentUserId = useSelector((state: RootState) => state.currentUser.currentUserId)

  const currentUserEmail = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const user = useSelector((state: RootState) => state.user)
  for (let i in user.Users) {
    console.log(user.Users[i].name)
    if (user.Users[i].email === currentUserEmail) {
      dispatch(currentUserActions.returnCurrentUserBook({ numberOfBooks: user.Users[i].books }))
    }
  }
  const onReturnBookHandler = (e: {
    target: { parentElement: { id: SetStateAction<undefined> } }
  }) => {
    setIsbn(e.target.parentElement.id)
    setModalOpen(true)
  }

  const exitModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={classes.returnBookContainer}>
      <div className={classes.bookToReturnContainer}>
        {booksOfCurrentUser.length > 0 ? (
          booksOfCurrentUser.map((book) => (
            <div className={classes.bookToReturn} id={book.id} key={book.id}>
              <div className={classes.bookToReturnIsbn}>{book.id}</div>
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
      {modalOpen && <ReturnBookModal exitModal={exitModal} userId={currentUserId} isbn={isbn} />}
    </div>
  )
}
export default ReturnBook
