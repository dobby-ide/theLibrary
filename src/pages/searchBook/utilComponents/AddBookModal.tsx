import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions, RootState, userActions } from '../../../store'
const AddBookModal = ({ isbn, user, exitModal }) => {
  const auser = useSelector((state: RootState) => state.user.Users)
  const dispatch = useDispatch()
  const borrowedBook = useSelector((state: RootState) =>
    state.book.Books.filter((book) => String(book.ISBN) === isbn)
  )

  const confirmBook = () => {
    dispatch(bookActions.borrowBook({ isbn: isbn, userId: user }))
    dispatch(userActions.cart({ userId: user, book: borrowedBook }))
    exitModal()
  }
  console.log(user)
  console.log(borrowedBook)
  return (
    <div>
      <h2>inside ADD a BOOK MODAL</h2>
      <button onClick={confirmBook}>confirm</button>
    </div>
  )
}
export default AddBookModal
