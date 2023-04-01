import { useParams } from 'react-router-dom'

import classes from './styling/SearchBookDetail.module.scss'
import Book from '../../model/book'
import { AuthorBookTable } from './utilComponents/AuthorBookTable'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

const SearchBookDetail = (props: { book: Book[] }) => {
  const params = useParams()
  const [filteredResult] = props.book.filter((book) => String(book.ISBN) === String(params.bookID))
  const books = useSelector((state: RootState) => state.book.Books)
  const author = filteredResult.authors[0].name
  const booksOfAuthor = books.filter((book) => book.authors[0].name === author)
  const data = booksOfAuthor.map((book) => {
    const { title, authors, ISBN } = book
    return {
      title: book.title,

      author: author,
      year: 222,
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
              <span>{author.name} </span>
            ))}
          </p>
          <p>{filteredResult.category}</p>
          <p>{filteredResult.publisher}</p>
          <p>{filteredResult.status}</p>
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
