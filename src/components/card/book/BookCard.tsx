// @ts-nocheck
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../../store'
import AddBookModal from '../../modals/book/AddBookModal'
import classes from '../style/BookCard.module.scss'
import Search from '../../features/Search'
import Filter from '../../features/Filter'
import Book from '../../../model/book'

import { Card } from '@mantine/core'

const BookCard = (props: { books: Book[] }) => {
  const [result, setResult] = useState(Array<Book>)
  const [bookId, setBookId] = useState()
  const [openModal, setOpenModal] = useState(false)
  const userEmail = useSelector((state: RootState) => state.currentUser.currentUserEmail)

  const userId = useSelector((state: RootState) => state.currentUser.currentUserId)

  console.log('user email  is', userEmail)

  const exitModal = () => {
    setOpenModal(false)
  }

  const borrowingBookHandler = (e: { target: { parentElement: { id: any } } }) => {
    const chosenBookId = e.target.parentElement.id
    setBookId(chosenBookId)
    setOpenModal(true)
  }

  const onSearchingInputs = (inputByUser: []) => {
    setResult(inputByUser)
  }

  const onCategorySelectHandler = (result: []) => {
    result.length > 0 && setResult(result)
  }

  return (
    <section className={classes.bookCard_container}>
      <header className={classes.bookCard_container_header}>
        <Search books={props.books} updatedBooks={result} back={onSearchingInputs} />
        <Filter results={onCategorySelectHandler} books={props.books}></Filter>
      </header>
      <div className={classes.renderedBooks}>
        {openModal && (
          <AddBookModal exitModal={exitModal} userId={userId} bookId={bookId}></AddBookModal>
        )}
        {result.map((book) => {
          return !userEmail ? (
            <Card shadow="sm" padding="lg" key={book.id} className={classes.singleCard_container}>
              <Link to={`./${book.id}`} relative="path">
                <div className={classes.bookTitle}>{book.title}</div>

                <div className={classes.bookDescr}>{book.description}</div>

                <div className={`${book.quantity} > 0 && ${classes.bookStatusAvailable}`}>
                  {book.quantity}
                </div>
                {book.returnDate && (
                  <div className={classes.bookReturnData}>Return day: {book.returnDate}</div>
                )}

                {book.authors.map((author) => {
                  return (
                    <div className={classes.bookAuthors} key={author.authorName}>
                      Author: {author.authorName}
                    </div>
                  )
                })}

                <div className={classes.imageContainer}>
                  <img className={classes.image} src={book.imageUrl}></img>
                </div>
              </Link>
            </Card>
          ) : (
            <Card
              shadow="sm"
              padding="lg"
              className={classes.singleCard_container}
              key={book.id}
              id={book.id}>
              {book.quantity > 0 && (
                <button className={classes.borrowingBook_button} onClick={borrowingBookHandler}>
                  borrow
                </button>
              )}

              <Link to={`./${book.id}`} relative="path">
                <div className={classes.bookTitle}>
                  <p>{book.title}</p>
                </div>

                <div className={classes.bookDescr}>
                  <p>{book.description}</p>
                </div>

                <div className={`${book.quantity} > 0 && ${classes.bookStatusAvailable}`}>
                  {book.quantity > 0 && <p> available {book.quantity} copy(es)</p>}
                </div>
                {book.returnDate && (
                  <div className={classes.bookReturnDate}>Return day: {book.returnDate}</div>
                )}

                {book.authors.map((author) => {
                  return (
                    <div className={classes.bookAuthors} key={author.authorName}>
                      {author.authorName}
                    </div>
                  )
                })}

                <div className={classes.imageContainer}>
                  <img className={classes.image} src={book.imageUrl}></img>
                </div>
              </Link>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
export default BookCard
