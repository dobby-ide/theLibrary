import React from 'react'
import Book from '../../model/book'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import BookCard from './utilComponents/BookCard'
const SearchBook: React.FC = () => {
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)
  const books = useSelector((state: RootState) => state.book.Books)

  console.log(books)
  return (
    <div>
      <h1>search book welcome {userName}</h1>
      <div>
        <BookCard books={books} />
      </div>
      {userName && <p>ciao bello</p>}
    </div>
  )
}
export default SearchBook
