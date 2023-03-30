import { useDispatch } from 'react-redux'

import { userActions, bookActions } from '../../../store'
import classes from '../styling/ReturnBookModal.module.scss'

const ReturnBookModal = (props: { exitModal: any; isbn: string; userId: any }) => {
  const dispatch = useDispatch()

  const exit = () => {
    props.exitModal()
  }

  const onBookReturn = () => {
    dispatch(userActions.returnBook({ user: props.userId, isbn: props.isbn }))
    dispatch(bookActions.returnBook({ isbn: props.isbn }))
    props.exitModal()
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
