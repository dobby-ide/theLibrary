import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ReturnBookModal from '../searchBook/utilComponents/ReturnBookModal'
const ReturnBook = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isbn, setIsbn] = useState()
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const fullUser = useSelector((state: RootState) =>
    state.user.Users.filter((user) => String(user.email) === currentUser)
  )
  const finalBooks = []
  for (let i in fullUser[0].booksBorrowed) {
    const t = fullUser[0].booksBorrowed[i]
    for (let j in t) {
      finalBooks.push(t[j])
    }
  }
  console.log(fullUser)
  const onReturnBookHandler = (e) => {
    setIsbn(e.target.parentElement.id)
    setModalOpen(true)
  }
  const exitModal = () => {
    setModalOpen(false)
  }
  return (
    <div>
      <h1>I am return book</h1>
      <div>
        {fullUser[0].booksBorrowed.length > 0 ? (
          finalBooks.map((book) => (
            <div id={book.ISBN}>
              <div>{book.ISBN}</div>
              <div>{book.title}</div>
              <button onClick={onReturnBookHandler}>return book</button>
            </div>
          ))
        ) : (
          <p>no books to return</p>
        )}
      </div>
      {modalOpen && <ReturnBookModal exitModal={exitModal} userId={currentUser} isbn={isbn} />}
    </div>
  )
}
export default ReturnBook
