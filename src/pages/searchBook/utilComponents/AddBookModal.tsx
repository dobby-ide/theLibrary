import { useDispatch, useSelector } from 'react-redux'

import { bookActions, RootState, userActions } from '../../../store'
import classes from '../styling/AddBookModal.module.scss'

const AddBookModal = ({ isbn, user, exitModal }) => {

  const dispatch = useDispatch()
  const borrowedBook = useSelector((state: RootState) =>
    state.book.Books.filter((book) => String(book.ISBN) === isbn)
  )

  const confirmBook = () => {
    dispatch(bookActions.borrowBook({ isbn: isbn, userId: user }))
    dispatch(userActions.cart({ userId: user, book: borrowedBook }))
    exitModal()
  }

  const exit = () => {
    exitModal()
  }

  return (
    <div className={classes.addBookModal}>
      <div className={classes.text}>
        <p>confirm your selection</p>
      </div>
      <div className={classes.button}>
        <button className={classes.modalButton} onClick={confirmBook}>
          confirm
        </button>
        <button className={classes.modalButton} onClick={exit}>
          cancel
        </button>
      </div>
    </div>
  )
}
export default AddBookModal
