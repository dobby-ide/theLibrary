// @ts-nocheck
import { useState, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../style/AdminBooksCard.module.scss'
import { bookActions, fetchBooks, removeBookFromServer } from '../../../redux/slices/bookSlice'
import UpdateBookModal from '../../modals/book/UpdateBookModal'
import { CSSTransition } from 'react-transition-group'

const AdminBookCard = ({
  id,
  isbn,
  title,
  description,
  publisher,
  authors,
  borrowerId,
  returnDate
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBooks('api/v1/books'))
  }, [dispatch])
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [chosenBook, setChosenBook] = useState()

  const onClosingModalHandler = () => {
    dispatch(fetchBooks('api/v1/books'))
    setModalIsVisible(false)
  }

  const onUpdateBookHandler = (e) => {
    dispatch(fetchBooks('api/v1/books'))
    setModalIsVisible(true)
    setChosenBook(e.target.parentElement.id)
  }

  const onDeleteBookHandler = (e) => {
    dispatch(removeBookFromServer(`api/v1/books/${e.target.parentElement.id}`))
    dispatch(bookActions.removeBook(e.target.parentElement.id))
  }

  return (
    <>
      <div className={classes.updateBookModal} key={id}>
        <CSSTransition
          in={modalIsVisible}
          timeout={3000}
          classNames="modalNewBook"
          active
          unmountOnExit>
          <UpdateBookModal bookId={chosenBook} exit={onClosingModalHandler}></UpdateBookModal>
        </CSSTransition>
      </div>
      <section className={classes.bookCard_container}>
        <div className={classes.singleCard_container} key={id} id={id}>
          <div className={classes.singleCard_containerTitle}>{title}</div>

          <div className={classes.singleCard_containerDescr}>{description}</div>
          <div className={classes.singleCard_containerPublisher}>{publisher}</div>
          {authors.map((author) => (
            <div key={author.authorName} className={classes.singleCard_containerAuthors}>
              {author.authorName}
            </div>
          ))}

          <div>{borrowerId}</div>
          <div>{returnDate}</div>
          <button onClick={onDeleteBookHandler}>delete book</button>
          <button onClick={onUpdateBookHandler}>update book</button>
          <div id="isbn" className={classes.singleCard_containerIsbn}>
            {isbn}
          </div>
        </div>
      </section>
    </>
  )
}

export default memo(AdminBookCard)
