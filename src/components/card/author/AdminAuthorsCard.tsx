// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { authorActions, fetchAuthors } from '../../../redux/slices/authorSlice'
import UpdateAuthorModal from '../../modals/author/UpdateAuthorModal'

import { deleteAuthor } from '../../../redux/slices/authorSlice'

const AdminAuthorsCard: React.FC = ({ authorId, authorName, dateOfBirth, books }) => {
  const dispatch = useDispatch()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [chosenAuthor, setChosenAuthor] = useState()

  const openModal = () => {
    setModalIsVisible(true)
    setChosenAuthor(authorId)
  }

  const closeModal = () => {
    setModalIsVisible(false)
    setChosenAuthor(authorId)
  }

  const onDeleteAuthorHandler = (e: { target: { parentElement: { id: any } } }) => {
    dispatch(deleteAuthor(`api/v1/authors/${e.target.parentElement.id}`))
    dispatch(authorActions.removeAuthor(e.target.parentElement.id))
  }

  useEffect(() => {
    dispatch(fetchAuthors('api/v1/authors'))
  }, [dispatch])
  return (
    <div id={authorId} key={authorId}>
      <div>{authorName}</div>
      <div>{dateOfBirth}</div>
      {books != null && books.map((book) => <div key={book.id}>{book.title}</div>)}
      <button onClick={onDeleteAuthorHandler}>remove</button>
      <button onClick={openModal}>modify</button>
      <div>{modalIsVisible && <UpdateAuthorModal exit={closeModal} authorId={chosenAuthor} />}</div>
    </div>
  )
}
export default AdminAuthorsCard
