// @ts-nocheck
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../../store'
import AddBookModal from '../../modals/book/AddBookModal'
import classes from '../style/BookCard.module.scss'
import Search from '../../features/Search'
import Filter from '../../features/Filter'
import Book from '../../../model/book'
import { books } from '../../../data/mockData'
import { Card } from '@mantine/core'

const BookCard = (props: { books: Book[] }) => {
  const [result, setResult] = useState(Array<Item>)
  const [bookIsbn, setBookIsbn] = useState()
  const [openModal, setOpenModal] = useState(false)
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)
  const userEmail = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const userId = useSelector((state: RootState) =>
    state.user.Users.filter((user) => String(user.email) === userEmail)
  )

  const exitModal = () => {
    setOpenModal(false)
  }

  const borrowingBookHandler = (e: { target: { parentElement: { id: any } } }) => {
    const isbn = e.target.parentElement.id
    setBookIsbn(isbn)
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
        <Search books={books} updatedBooks={result} back={onSearchingInputs} />
        <Filter results={onCategorySelectHandler} books={props.books}></Filter>
      </header>
      <div className={classes.renderedBooks}>
        {openModal && (
          <AddBookModal exitModal={exitModal} user={userId[0]} isbn={bookIsbn}></AddBookModal>
        )}
        {result.map((book) => {
          return !userName ? (
            <Card shadow="sm" padding="lg" key={book.ISBN} className={classes.singleCard_container}>
              <Link to={`./${book.ISBN}`} relative="path">
                <div className={classes.bookTitle}>{book.title}</div>

                <div className={classes.bookDescr}>{book.description}</div>

                <div className={`${book.status} === "Available" && ${classes.bookStatusAvailable}`}>
                  {book.status}
                </div>
                {book.returnDate && (
                  <div className={classes.bookReturnData}>Return day: {book.returnDate}</div>
                )}

                {book.authors.map((author) => {
                  return (
                    <div className={classes.bookAuthors} key={author.name}>
                      Author: {author.name}
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
              key={book.ISBN}
              id={book.ISBN}>
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
                  <p>{book.description}</p>
                </div>

                <div className={`${book.status} === "Available" && ${classes.bookStatusAvailable}`}>
                  <p>{book.status}</p>
                </div>
                {book.returnDate && (
                  <div className={classes.bookReturnDate}>Return day: {book.returnDate}</div>
                )}

                {book.authors.map((author) => {
                  return (
                    <div className={classes.bookAuthors} key={author.name}>
                      {author.name}
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
