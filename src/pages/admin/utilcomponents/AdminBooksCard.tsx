import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bookActions } from '../../../store'
import UpdateBookModal from './UpdateBookModal'

const AdminBookCard = ({
  isbn,
  title,
  description,
  publisher,
  authors,
  status,
  borrowerId,
  returnDate
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [chosenBook, setChosenBook] = useState()
  const dispatch = useDispatch()
  const onClosingModalHandler = () => {
    setModalIsVisible(false)
  }
  const onUpdateBookHandler = (e) => {
    setModalIsVisible(true)
    setChosenBook(e.target.parentElement.id)
  }
  const onDeleteBookHandler = (e) => {
    console.log(e.target.parentElement.id)
    dispatch(bookActions.removeBook(e.target.parentElement.id))
  }
  return (
    <div key={isbn} id={isbn}>
      <div>{isbn}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{publisher}</div>
      <div>{authors}</div>
      <div>{status}</div>
      <div>{borrowerId}</div>
      <div>{returnDate}</div>
      <button onClick={onDeleteBookHandler}>delete book</button>
      <button onClick={onUpdateBookHandler}>update book</button>
      {modalIsVisible && (
        <UpdateBookModal isbn={chosenBook} exit={onClosingModalHandler}></UpdateBookModal>
      )}
    </div>
  )
}
export default AdminBookCard
