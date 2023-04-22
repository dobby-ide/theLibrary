// @ts-nocheck
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import { RootState } from '../../store'
import AdminBooksCard from '../../components/card/admin/AdminBooksCard'
import NewBookModal from '../../components/modals/book/NewBookModal'
import classes from './styling/AdminBooks.module.scss'
import './styling/AdminBook.scss'

const AdminBooks = () => {
  const [openModal, setOpenModal] = useState(false)

  const addNewBook = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setOpenModal(true)
  }

  const onClosingModalHandler = () => {
    setOpenModal(false)
  }

  const books = useSelector((state: RootState) => state.book.Books)
  console.log(books)
  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <section className={classes.adminBookContainer}>
      <div className={classes.AdminPanel}>
        <div className={classes.button_addBook}>
          <CSSTransition
            in={openModal}
            timeout={3000}
            classNames="modalNewBook"
            active
            unmountOnExit>
            <div className="modalNewBook_container">
              <h2 className="modalF-content__title">new book</h2>
              <NewBookModal closeModal={onClosingModalHandler} />

              <button className="modalNewBook_container_button" onClick={toggleModal}>
                x
              </button>
            </div>
          </CSSTransition>

          <button onClick={addNewBook}>add a new book</button>
        </div>
      </div>
      <div className={classes.AdminBookCard_container}>
        {books.map((book) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <AdminBooksCard
              key={book.ISBN}
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
      </div>
    </section>
  )
}
export default AdminBooks
