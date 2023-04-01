import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'

import BookCard from './utilComponents/BookCard'
import Book from '../../model/book'
import classes from './styling/SearchBook.module.scss'

const SearchBook: React.FC = () => {
  const books: Book[] = useSelector((state: RootState) => state.book.Books)

  return (
    <section className={classes.searchBookContainer}>
      <div className={classes.bookCard_container}>
        <BookCard books={books} />
      </div>
    </section>
  )
}
export default SearchBook
