import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import AdminBooksCard from './utilcomponents/AdminBooksCard'
import NewBookModal from './utilcomponents/NewBookModal'
import classes from './styling/AdminBooks.module.scss'

const AdminBooks = () => {
  //ADD A BOOK FROM ADMIN
  const [openModal, setOpenModal] = useState(false)

  const addNewBook = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setOpenModal(true)
  }

  const onClosingModalHandler = () => {
    setOpenModal(false)
  }

  const books = useSelector((state: RootState) => state.book.Books)
  return (
    <section className={classes.adminBookContainer}>
      <div className={classes.button_addBook}>
        <button onClick={addNewBook}>add a new book</button>
      </div>
      <div className={classes.AdminBookCard_container}>
        {books.map((book) => {
          return (
            // eslint-disable-next-line react/jsx-key
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
    </section>
  )
}
export default AdminBooks
