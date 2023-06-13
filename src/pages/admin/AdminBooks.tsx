// @ts-nocheck
import { useState, useEffect, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { fetchBooks } from '../../redux/slices/bookSlice'
import { RootState } from '../../store'
import AdminBooksCard from '../../components/card/admin/AdminBooksCard'
import NewBookModal from '../../components/modals/book/NewBookModal'
import classes from './styling/AdminBooks.module.scss'
import './styling/AdminBook.scss'

const AdminBooks = () => {
  console.log('AdminBooks renders')
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [fetchingBooks, setFetchingBooks] = useState(false)
  const books = useSelector((state: RootState) => state.book.Books)
  useEffect(() => {
    setFetchingBooks(true)
    dispatch(fetchBooks('api/v1/books')).finally(() => {
      setFetchingBooks(false)
    })
  }, [dispatch])

  const addNewBook = useCallback((e) => {
    e.preventDefault()
    setOpenModal(true)
  }, [])

  const onClosingModalHandler = useCallback(() => {
    setFetchingBooks(true)
    dispatch(fetchBooks('api/v1/books')).finally(() => {
      setFetchingBooks(false)
      setOpenModal(false)
    })
  }, [dispatch])

  const toggleModal = useCallback(() => {
    setFetchingBooks(true)
    dispatch(fetchBooks('api/v1/books')).finally(() => {
      setFetchingBooks(false)
      setOpenModal((prevState) => !prevState)
    })
  }, [dispatch])
  if (fetchingBooks) {
    return <div>Loading...</div>
  }
  console.log(books)
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
              key={book.id}
              id={book.id}
              isbn={book.isbn}
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
export default memo(AdminBooks)
