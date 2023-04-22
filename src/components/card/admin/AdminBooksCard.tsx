// @ts-nocheck
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import classes from '../style/AdminBooksCard.module.scss'
import { bookActions } from '../../../redux/slices/bookSlice'
import UpdateBookModal from '../../modals/book/UpdateBookModal'
import { CSSTransition } from 'react-transition-group'

const AdminBookCard = ({
  isbn,
  title,
  description,
  publisher,
  authors,
  status,
  borrowerId,
  returnDate
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [chosenBook, setChosenBook] = useState()
  const dispatch = useDispatch()

  const onClosingModalHandler = () => {
    setModalIsVisible(false)
  }

  const onUpdateBookHandler = (e) => {
    setModalIsVisible(true)
    setChosenBook(e.target.parentElement.id)
  }

  const onDeleteBookHandler = (e) => {
    dispatch(bookActions.removeBook(e.target.parentElement.id))
  }
  const provaa = (e) => {
    BookID(e.target.parentElement.id)
  }
  return (
    <>
      <div className={classes.updateBookModal}>
        <CSSTransition
          in={modalIsVisible}
          timeout={3000}
          classNames="modalNewBook"
          active
          unmountOnExit>
          <UpdateBookModal isbn={chosenBook} exit={onClosingModalHandler}></UpdateBookModal>
        </CSSTransition>
      </div>
      <section className={classes.bookCard_container}>
        <div className={classes.singleCard_container} onClick={provaa} key={isbn} id={isbn}>
          <div className={classes.singleCard_containerIsbn}>{isbn}</div>
          <div className={classes.singleCard_containerTitle}>{title}</div>
          <div className={classes.singleCard_containerDescr}>{description}</div>
          <div className={classes.singleCard_containerPublisher}>{publisher}</div>
          {authors.map((author) => (
            <div key={author.name} className={classes.singleCard_containerAuthors}>
              {author.name}
            </div>
          ))}
          <div
            className={
              status === 'Available'
                ? classes.singleCard_containerStatusAvailable
                : classes.singleCard_containerStatus
            }>
            {status}
          </div>
          <div>{borrowerId}</div>
          <div>{returnDate}</div>
          <button onClick={onDeleteBookHandler}>delete book</button>
          <button onClick={onUpdateBookHandler}>update book</button>
        </div>
      </section>
    </>
  )
}
export default AdminBookCard
