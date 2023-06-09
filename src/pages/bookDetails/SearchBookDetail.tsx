// @ts-nocheck
import { useParams } from 'react-router-dom'

import classes from './style/SearchBookDetail.module.scss'
import Book from '../../model/book'
import { AuthorBookTable } from '../author/AuthorBookTable'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

const SearchBookDetail = (props: { book: Book[] }) => {
  const params = useParams()
  console.log(params.bookID)
  const [filteredResult] = props.book.filter((book) => String(book.id) === String(params.bookID))
  console.log(filteredResult)
  const books = useSelector((state: RootState) => state.book.Books)
  console.log(books)
  const author = filteredResult.authors[0].authorName
  const booksOfAuthor = books.filter(
    (book) => book.authors[0] && book.authors[0].authorName === author
  )
  const data = booksOfAuthor.map((book) => {
    const { title, authors, ISBN } = book
    return {
      title: book.title,

      author: author,
      year: book.year,
      reviews: {
        positive: 2,
        negative: 2
      }
    }
  })
  return (
    <section className={classes.bookDetail_container}>
      <div className={classes.moreAboutTheAuthor}>
        <AuthorBookTable data={data}></AuthorBookTable>
      </div>
      <div className={classes.card}>
        <div className={classes.card__side_front}>
          <h1>{filteredResult.title}</h1>
          <p>{filteredResult.description}</p>
          <p>
            {filteredResult.authors.map((author) => (
              <span>{author.authorName} </span>
            ))}
          </p>

          <p>{filteredResult.publisher}</p>
          {filteredResult.quantity > 0 && <p>{filteredResult.quantity} available</p>}
        </div>
        <div className={classes.card__side_back}>
          {filteredResult.authors[0].photoUrl ? (
            <img src={filteredResult.authors[0].photoUrl} className={classes.authorImage}></img>
          ) : (
            <span className={classes.nophotoAvailable}>no photo available</span>
          )}
        </div>
      </div>
    </section>
  )
}
export default SearchBookDetail
