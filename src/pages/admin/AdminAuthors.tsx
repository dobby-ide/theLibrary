// @ts-nocheck
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import AdminAuthorsCard from '../../components/card/author/AdminAuthorsCard'
import NewAuthorModal from '../../components/modals/author/NewAuthorModal'
import { fetchAuthors } from '../../redux/slices/authorSlice'
import classes from '../admin/styling/AdminAuthors.module.scss'

const AdminAuthors = () => {
  const dispatch = useDispatch()
  const [modalIsVisible, setModalVisible] = useState(false)
  const authors = useSelector((state: RootState) => state.author.Authors)

  useEffect(() => {
    dispatch(fetchAuthors('api/v1/authors'))
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    dispatch(fetchAuthors('api/v1/authors'))
    setModalVisible(false)
  }

  return (
    <div className={classes.adminAuthorCards_container}>
      <div>
        <button className={classes.addAuthor_button} onClick={openModal}>
          add Author
        </button>
      </div>
      {authors.map((author) => {
        // eslint-disable-next-line react/jsx-key
        return (
          <AdminAuthorsCard
            key={author.id}
            authorId={author.id}
            authorName={author.authorName}
            dateOfBirth={author.dateOfBirth}
            books={author.books}
          />
        )
      })}
      {modalIsVisible && <NewAuthorModal closeModal={closeModal} />}
    </div>
  )
}
export default AdminAuthors
