import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { authorActions } from '../../../store'
import UpdateAuthorModal from './UpdateAuthorModal'

const AdminAuthorsCard: React.FC = ({ authorName }) => {
  const dispatch = useDispatch()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [chosenAuthor, setChosenAuthor] = useState()

  const openModal = () => {
    setModalIsVisible(true)
    setChosenAuthor(authorName)
  }

  const closeModal = () => {
    setModalIsVisible(false)
    setChosenAuthor(authorName)
  }

  const onDeleteBookHandler = (e) => {
    dispatch(authorActions.removeAuthor(e.target.parentElement.id))
  }

  return (
    <div id={authorName}>
      <div>{authorName}</div>
      <button onClick={onDeleteBookHandler}>remove</button>
      <button onClick={openModal}>modify</button>
      <div>{modalIsVisible && <UpdateAuthorModal exit={closeModal} name={chosenAuthor} />}</div>
    </div>
  )
}
export default AdminAuthorsCard
