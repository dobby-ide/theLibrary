import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, bookActions, userActions } from '../../../store'
import AddBookModal from './AddBookModal'

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
    <div>
      <h1>List of all the books available</h1>
      <div>
        {books.map((book) => {
          return !userName ? (
            <div key={book.ISBN}>
              <Link to={`user/search/${book.ISBN}`}>
                <div>{book.ISBN}</div>
                <div>{book.title}</div>
                <div>{book.description}</div>
                <div>{book.publisher}</div>
                <div>{book.status}</div>
                <div>{book.returnDate}</div>
                <div>{book.borrowerId}</div>
                {book.authors.map((author) => {
                  return <div key={author}>{author}</div>
                })}
              </Link>
            </div>
          ) : (
            <div key={book.ISBN} id={book.ISBN}>
              {book.status === 'Available' && (
                <button onClick={borrowingBookHandler}>borrow</button>
              )}
              {openModal && (
                <AddBookModal exitModal={exitModal} user={userId[0]} isbn={bookIsbn}></AddBookModal>
              )}
              <div>{book.ISBN}</div>
              <div>{book.title}</div>
              <div>{book.description}</div>
              <div>{book.publisher}</div>
              <div>{book.status}</div>
              <div>{book.returnDate}</div>
              <div>{book.borrowerId}</div>
              {book.authors.map((author) => {
                return <div key={author}>{author}</div>
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default BookCard
