// @ts-nocheck
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'

import BookCard from '../../components/card/book/BookCard'
import Book from '../../model/book'
import classes from './style/SearchBook.module.scss'
import { fetchBooks } from '../../redux/slices/bookSlice'

const SearchBook: React.FC = () => {
  const dispatch = useDispatch()
  const books: Book[] = useSelector((state: RootState) => state.book.Books)
  const status = useSelector((state: RootState) => state.book.status)
  const error = useSelector((state: RootState) => state.book.error)

  useEffect(() => {
    dispatch(fetchBooks('books'))
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }
  console.log(books)
  return (
    <section className={classes.searchBookContainer}>
      <div className={classes.bookCard_container}>
        <BookCard books={books} />
      </div>
    </section>
  )
}
export default SearchBook
