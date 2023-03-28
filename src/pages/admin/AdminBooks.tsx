import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { bookActions } from '../../store'
import Book from '../../model/book'
import { RootState } from '../../store'
import AdminBooksCard from './utilcomponents/AdminBooksCard'
import NewBookModal from './utilcomponents/NewBookModal'

const AdminBooks = () => {
  //ADD A BOOK FROM ADMIN
  const [openModal, setOpenModal] = useState(false)

  const addNewBook = (e) => {
    e.preventDefault()
    setOpenModal(true)
  }

  const onClosingModalHandler = () => {
    setOpenModal(false)
  }

  const books = useSelector((state: RootState) => state.book.Books)
  return (
    <div>
      <h1>I am admin books page</h1>

      <div>
        <button onClick={addNewBook}>add a new book</button>
      </div>

      {books.map((book) => {
        return (
          <AdminBooksCard
            isbn={book.ISBN}
            title={book.title}
            description={book.description}
            publisher={book.publisher}
            authors={book.authors}
            status={book.status}
            borrowerId={book.borrowerId}
            returnDate={book.returnDate}
          />
        )
      })}
      {openModal && <NewBookModal closeModal={onClosingModalHandler} />}
    </div>
  )
}
export default AdminBooks
