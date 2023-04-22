// @ts-nocheck
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import AdminAuthorsCard from '../../components/card/author/AdminAuthorsCard'
import NewAuthorModal from '../../components/modals/author/NewAuthorModal'

const AdminAuthors = () => {
  const [modalIsVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const authors = useSelector((state: RootState) => state.author.Authors)
console.log(authors)
return (
  <div>
    <h1>I am admin authors page</h1>
    <div>
      <button onClick={openModal}>add Author</button>
    </div>
    {authors.map((author) => {
      // eslint-disable-next-line react/jsx-key
      return <AdminAuthorsCard authorName={author.name} key={author.name} />
    })}
    {modalIsVisible && <NewAuthorModal closeModal={closeModal} />}
  </div>
)
}
export default AdminAuthors
