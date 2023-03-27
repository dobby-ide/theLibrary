import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import BookCard from './utilComponents/BookCard'
import classes from './styling/SearchBook.module.scss'
const SearchBook: React.FC = () => {
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)
  const books = useSelector((state: RootState) => state.book.Books)
  console.log(books)
  return (
    <section className={classes.searchBookContainer}>
      {userName && <h2>active user: {userName}</h2>}
      <div className={classes.bookCard_container}>
        <BookCard books={books} />
      </div>
    </section>
  )
}
export default SearchBook
