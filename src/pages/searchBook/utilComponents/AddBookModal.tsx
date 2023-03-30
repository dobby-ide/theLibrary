import { useDispatch, useSelector } from 'react-redux'

import { bookActions, RootState, userActions } from '../../../store'
import classes from '../styling/AddBookModal.module.scss'

const AddBookModal = (props: { isbn: number; user: string; exitModal: () => void }) => {
  const dispatch = useDispatch()
  const borrowedBook = useSelector((state: RootState) =>
    state.book.Books.filter((book) => String(book.ISBN) === String(props.isbn))
  )

  const confirmBook = () => {
    dispatch(bookActions.borrowBook({ isbn: props.isbn, userId: props.user }))
    dispatch(userActions.cart({ userId: props.user, book: borrowedBook }))
    props.exitModal()
  }

  const exit = () => {
    props.exitModal()
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
