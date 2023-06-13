// @ts-nocheck
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { returnBook } from '../../../redux/slices/userSlice'

import classes from '../style/ReturnBookModal.module.scss'

const ReturnBookModal = (props: { exitModal: any; isbn: string; userId: any }) => {
  console.log('inside returnBookModal ', props.isbn, 'and user id is ', props.userId)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const currentUserEmail = useSelector((state: RootState) => state.currentUser.currentUserEmail)

  const exit = () => {
    for (let i in user.Users) {
      console.log(user.Users[i].name)
      if (user.Users[i].email === currentUserEmail) {
        dispatch(currentUserActions.returnCurrentUserBook({ numberOfBooks: user.Users[i].books }))
      }
    }
    props.exitModal()
  }

  const onBookReturn = () => {
    dispatch(returnBook(`api/v1/users/${props.userId}/return-book/${props.isbn}`))

    //dispatch(currentUserActions.returnCurrentUserBook())

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
