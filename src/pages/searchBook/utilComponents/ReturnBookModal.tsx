import { useDispatch } from 'react-redux'

import { userActions, bookActions } from '../../../store'
import classes from '../styling/ReturnBookModal.module.scss'

const ReturnBookModal = ({ exitModal, isbn, userId }) => {
  const dispatch = useDispatch()

  const exit = () => {
    exitModal()
  }

  const onBookReturn = () => {
    dispatch(userActions.returnBook({ user: userId, isbn: isbn }))
    dispatch(bookActions.returnBook({ isbn: isbn }))
    exitModal()
  }

  return (
    <div className={classes.container}>
      <div>
        <button onClick={exit}>cancel</button>
        <button onClick={onBookReturn}>confirm</button>
      </div>
    </div>
  )
}
export default ReturnBookModal
