import React from 'react'
import { useDispatch } from 'react-redux'
import { userActions, bookActions } from '../../../store'
const ReturnBookModal = ({ exitModal, isbn, userId }) => {
  const dispatch = useDispatch()
  const exit = () => {
    exitModal()
  }
  const onBookReturn = () => {
    dispatch(userActions.returnBook({ user: userId, isbn: isbn }))
    exitModal()
  }
  return (
    <div>
      <h2>I am return modal</h2>
      <div>
        <button onClick={exit}>cancel</button>
        <button onClick={onBookReturn}>confirm</button>
      </div>
    </div>
  )
}
export default ReturnBookModal
