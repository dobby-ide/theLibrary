// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux'
import { borrowBook } from '../../../redux/slices/userSlice'

import classes from '../style/AddBookModal.module.scss'

const AddBookModal = (props: { bookId: number; userId: string; exitModal: () => void }) => {
  const dispatch = useDispatch()

  const confirmBook = () => {
    dispatch(borrowBook(`api/v1/users/${props.userId}/borrow-book/${props.bookId}`))

    props.exitModal()
  }

  const exit = () => {
    props.exitModal()
  }
  console.log(props.bookId)
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
