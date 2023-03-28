import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import AdminAuthorsCard from './utilcomponents/AdminAuthorsCard'
import NewAuthorModal from './utilcomponents/NewAuthorModal'

const AdminAuthors = () => {
  const [modalIsVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const authors = useSelector((state: RootState) => state.author.Authors)
  return (
    <div>
      <h1>I am admin authors page</h1>
      <div>
        <button onClick={openModal}>add Author</button>
      </div>
      {authors.map((author) => {
        return <AdminAuthorsCard authorName={author.name} />
      })}
      {modalIsVisible && <NewAuthorModal closeModal={closeModal} />}
    </div>
  )
}
export default AdminAuthors
