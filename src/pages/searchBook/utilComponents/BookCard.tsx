import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, bookActions, userActions } from '../../../store'
import AddBookModal from './AddBookModal'
import classes from '../styling/BookCard.module.scss'

const BookCard: React.FC = ({ books }) => {
  const [bookIsbn, setBookIsbn] = useState()
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.Users)
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)
  const userEmail = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const userId = useSelector((state: RootState) =>
    state.user.Users.filter((user) => String(user.email) === userEmail)
  )
  const exitModal = () => {
    setOpenModal(false)
  }
  const borrowingBookHandler = (e) => {
    const isbn = e.target.parentElement.id
    setBookIsbn(isbn)
    setOpenModal(true)
  }
  return (
    <section className={classes.bookCard_container}>
      <div className={classes.renderedBooks}>
        {openModal && (
          <AddBookModal exitModal={exitModal} user={userId[0]} isbn={bookIsbn}></AddBookModal>
        )}
        {books.map((book) => {
          return !userName ? (
            <div key={book.ISBN} className={classes.singleCard_container}>
              <Link to={`./${book.ISBN}`} relative="path">
                <div className={classes.bookTitle}>{book.title}</div>

                <div className={classes.bookDescr}>Description: {book.description}</div>
                <div className={classes.bookPublisher}>Publisher: {book.publisher}</div>
                <div className={`${book.status} === "Available" && ${classes.bookStatusAvailable}`}>
                  Status: {book.status}
                </div>
                {book.returnDate && (
                  <div className={classes.bookReturnData}>Return day: {book.returnDate}</div>
                )}

                {book.authors.map((author) => {
                  return (
                    <div className={classes.bookAuthors} key={author}>
                      Author: {author}
                    </div>
                  )
                })}
                <div className={classes.bookIsbn}>ISBN: {book.ISBN}</div>
                <div className={classes.imageContainer}>
                  <img className={classes.image} src={book.imageUrl}></img>
                </div>
              </Link>
            </div>
          ) : (
            <div className={classes.singleCard_container} key={book.ISBN} id={book.ISBN}>
              {book.status === 'Available' && (
                <button className={classes.borrowingBook_button} onClick={borrowingBookHandler}>
                  borrow
                </button>
              )}

              <Link to={`./${book.ISBN}`} relative="path">
                <div className={classes.bookTitle}>
                  <p>{book.title}</p>
                </div>

                <div className={classes.bookDescr}>
                  Description: <p>{book.description}</p>
                </div>
                <div className={classes.bookPublisher}>
                  Publisher: <p>{book.publisher}</p>
                </div>
                <div className={`${book.status} === "Available" && ${classes.bookStatusAvailable}`}>
                  Status: <p>{book.status}</p>
                </div>
                {book.returnDate && (
                  <div className={classes.bookReturnDate}>Return day: {book.returnDate}</div>
                )}

                {book.authors.map((author) => {
                  return (
                    <div className={classes.bookAuthors} key={author}>
                      {author}
                    </div>
                  )
                })}
                <div className={classes.bookIsbn}>
                  ISBN: <p>{book.ISBN}</p>
                </div>
                <div className={classes.imageContainer}>
                  <img className={classes.image} src={book.imageUrl}></img>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default BookCard
